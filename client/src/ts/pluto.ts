import normalizeUrl from "normalize-url";
import { useEffect } from "react";
import ReconnectingWebSocket, { UrlProvider } from "reconnecting-websocket";
import create, { State, StateCreator, UseStore } from "zustand";
import produce from "immer";
import _ from "lodash";
import { encode_message, decode_message } from "./msgpack";

const isPromise = (x: any): x is Promise<unknown> => {
  return x instanceof Promise;
};

const normalizeUrlProvider = (urlProvider: UrlProvider): UrlProvider => {
  switch (typeof urlProvider) {
    case "string": {
      return normalizeUrl(urlProvider);
    }
    case "function": {
      let result = urlProvider();

      if (typeof result === "string") {
        return normalizeUrl(result);
      }

      if (isPromise(result)) {
        return async () => {
          let url = await result;
          return normalizeUrl(url);
        };
      }
    }
    default: {
      throw new Error("Should never happen, really");
    }
  }
};

const createWebsocket = (
  urlProvider: UrlProvider,
  options: {
    maxReconnectionDelay?: number;
    minReconnectionDelay?: number;
    reconnectionDelayGrowFactor?: number;
    connectionTimeout?: number;
    maxRetries?: number;
    debug?: boolean;
  } = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false,
  }
) => {
  const normalizedUrlProvider = normalizeUrlProvider(urlProvider);

  return new ReconnectingWebSocket(normalizedUrlProvider, [], {
    ...options,
  });
};

const PORT = 1234;

const get_unique_short_id = (): Id => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
};

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

type Id = string;

const useSocket = create<{
  client_id: Id;
  socket: ReconnectingWebSocket;
  listeners: {
    [Key in UpdateType]?: ((event: UpdateEventMap[Key]) => void)[];
  };
  addListener: <T extends UpdateType>(
    update_type: T,
    listener: (event: UpdateEventMap[T]) => void
  ) => void;
  removeListener: <T extends UpdateType>(
    update_type: T,
    listener: (event: UpdateEventMap[T]) => void
  ) => void;
}>(
  immer((set, get) => ({
    client_id: get_unique_short_id(),
    socket: createWebsocket(
      async () => {
        const { protocol, hostname } = document.location;
        let url = `${protocol}//${hostname}:${PORT}/websocket_url_please`;
        let secret = await (await fetch(url)).text();
        return normalizeUrl(
          `${
            protocol === "https:" ? "wss" : "ws"
          }://localhost:${PORT}/${secret}`
        );
      },
      { debug: true }
    ),
    listeners: {},
    addListener: (update_type, listener) => {
      set((state) => {
        if (!state.listeners[update_type]) {
          state.listeners[update_type] = [listener];
        } else {
          state.listeners[update_type]!.push(listener);
        }
      });
    },
    removeListener: (update_type, listener) => {
      set((state) => {
        let index = state.listeners[update_type]?.indexOf(listener) || -1;

        if (index === -1) {
          throw new Error("Couldn't find listener :/");
        }

        delete state.listeners[update_type]![index];
      });
    },
  }))
);

type Update<T extends UpdateType = UpdateType> = {
  type: T;
  request_id: Id;
  initiator_id: Id;
  message: any;
};

useSocket.getState().socket.onmessage = async (event) => {
  let buffer: ArrayBuffer = await event.data.arrayBuffer();
  let update: Update = decode_message(buffer);
  console.log("update", update);

  let listeners = useSocket.getState().listeners?.[update.type] || [];
  listeners.forEach((listener) => {
    listener(update as any);
  });
};

type MessageType =
  | "get_all_notebooks"
  | "get_all_cells"
  | "get_output"
  | "getinput"
  | "change_cell"
  | "interrupt_all"
  | "move_multiple_cells"
  | "add_cell"
  | "delete_cell"
  | "fold_cell"
  | "set_input"
  | "run_multiple_cells"
  | "set_bond"
  | "move_notebook_file";

export const send = async (message_type: MessageType) => {
  const { client_id, socket } = useSocket.getState();
  const request_id = get_unique_short_id();

  let message = {
    type: message_type,
    client_id,
    request_id,
    body: {},
  };

  let encoded_message = encode_message(message);
  socket.send(encoded_message);
};

type UpdateEventMap = {
  notebook_list: Event;
  cell_output: Event;
  cell_queued: Event;
  cell_running: Event;
  cell_folded: Event;
  cell_input: Event;
  cell_deleted: Event;
  cells_moved: Event;
  cell_added: Event;
  bond_update: Event;
};

type UpdateType = keyof UpdateEventMap;

// const listen = <T extends UpdateType>(
//   update_type: T,
//   listener: (event: UpdateEventMap[T]) => void
// ) => {
//   const socket = useSocket((state) => state.socket);

//   useEffect(() => {}, []);
// };

export const Listener = <T extends UpdateType>({
  update_type,
  listener,
}: {
  update_type: T;
  listener: (event: UpdateEventMap[T]) => void;
}) => {
  const { addListener, removeListener } = useSocket((state) =>
    _.pick(state, "addListener", "removeListener")
  );

  useEffect(() => {
    addListener(update_type, listener);

    return () => removeListener(update_type, listener);
  }, []);

  return null;
};
