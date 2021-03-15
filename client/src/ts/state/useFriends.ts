import { WritableDraft } from "immer/dist/types/types-external";
import { sendRequest } from "ts/socket";
import type { Friend, FriendStatus } from "ts/types";
import { getNotebookId } from "ts/utils";
import create from "zustand";
import immer from "./immer";
import _ from "lodash";

const makeRequest = (status: FriendStatus) => {
  sendRequest("friends", {
    notebook_id: getNotebookId(),
    body: status,
  });
};

// These numbers are more magic than "empirical" tbh 🤔
const throttledRequest = _.throttle(makeRequest, 250);

// These numbers are more magic than "empirical" tbh 🤔
const debouncedRequest = _.debounce(makeRequest, 500);

const useFriends = create<{
  friends: { [id: string]: Friend };
  updateFriends: (
    fn: (draft: WritableDraft<{ [id: string]: Friend }>) => void
  ) => void;
  relayStatus: (status: FriendStatus) => void;
  relayStatusDebounced: (status: FriendStatus) => void;
  bufferedChanges: {
    changes: {
      value: string;
      range: {
        startOffset: number;
        endOffset: number;
      };
    };
    cell_id: string;
    offset: number;
  }[];
  sendThrottledChanges: _.DebouncedFunc<any>;
  relayChanges: ({
    changes,
    offset,
    cell_id,
  }: {
    changes: {
      value: string;
      range: {
        startOffset: number;
        endOffset: number;
      };
    };
    offset: number;
    cell_id: string;
  }) => void;
}>(
  immer((set, get) => ({
    friends: {},
    updateFriends: (fn) => {
      set(({ friends }) => void fn(friends));
    },
    relayStatus: (status) => {
      if (Object.keys(get().friends).length === 0) {
        return;
      }

      debouncedRequest.cancel();

      throttledRequest(status);
    },
    relayStatusDebounced: (status) => {
      if (Object.keys(get().friends).length === 0) {
        return;
      }

      debouncedRequest(status);
    },
    bufferedChanges: [],
    sendThrottledChanges: _.throttle(() => {
      let bufferedChanges = get().bufferedChanges;

      if (bufferedChanges.length === 0) {
        return;
      }

      let last = _.last(bufferedChanges)!;

      makeRequest({
        type: "cursor",
        cell_id: last.cell_id,
        offset: last.offset,
        changes: last.changes,
      });

      set(() => ({
        bufferedChanges: [],
      }));
    }, 750),
    relayChanges: ({ changes, offset, cell_id }) => {
      if (!changes) {
        return;
      }

      set(({ bufferedChanges }) => {
        if (
          bufferedChanges.length > 0 &&
          _.last(bufferedChanges)!.cell_id !== cell_id
        ) {
          get().sendThrottledChanges.flush();
        }

        bufferedChanges.push({ changes, offset, cell_id });
      });

      get().sendThrottledChanges();
    },
  }))
);

export { useFriends };

export default useFriends;
