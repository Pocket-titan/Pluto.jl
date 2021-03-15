import _ from "lodash";
import { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { useListener } from "ts/socket";
import { useEditorRefs, useFriends, useSelection } from "ts/state";
import Animal from "./Animal";
import RemoteCursor from "./RemoteCursor";

const Friends = () => {
  const {
    friends,
    updateFriends,
    relayStatus,
    relayStatusDebounced,
    relayChanges,
  } = useFriends();

  useListener("trigger", ({ body: { source, handlerId, payload } }) => {
    if (!payload.cell_id) {
      return;
    }

    let editor = useEditorRefs.getState().editors[payload.cell_id];
    if (!editor) {
      return;
    }

    if (handlerId === "remote-trigger-reveal-lines") {
      let pos = editor.getTopForLineNumber(payload.lineNumber);
      let rect = editor.getContainerDomNode().getBoundingClientRect();

      window.scrollTo({
        top: pos + (rect.top + window.pageYOffset),
        behavior: "smooth",
      });
    }
  });

  useEffect(() => {
    let subscriptions = [
      useSelection.subscribe(
        (ids: string[], previousIds: string[]) => {
          if (!_.isEqual(ids, previousIds)) {
            relayStatus(
              ids.length === 0
                ? { type: "idle" }
                : {
                    type: "selecting_cells",
                    cell_ids: ids,
                  }
            );
          }
        },
        (state) => state.selectedCells
      ),
      useEditorRefs.subscribe(
        (
          editors: {
            [id: string]: import("monaco-editor").editor.IStandaloneCodeEditor;
          },
          prevEditors
        ) => {
          let newKeys = _.difference(
            Object.keys(editors),
            Object.keys(prevEditors)
          );

          newKeys.forEach((key) => {
            let editor = editors[key];
            let model = editor.getModel()!;
            if (!model) {
              return;
            }

            editor.onDidChangeCursorSelection(
              ({ selection, reason, source }) => {
                if (reason === 0) {
                  return;
                }

                let cursorOffset = model.getOffsetAt(selection.getPosition());

                relayStatus({
                  type: "cursor",
                  offset: cursorOffset,
                  cell_id: key,
                  ...(!selection.isEmpty()
                    ? {
                        selection: {
                          startOffset: model.getOffsetAt(
                            selection.getStartPosition()
                          ),
                          endOffset: model.getOffsetAt(
                            selection.getEndPosition()
                          ),
                        },
                      }
                    : {}),
                });
              }
            );

            editor.onDidFocusEditorText(() => {
              // When you select a new cell at offset 0, the `cursorPosition` doesn't change (it's 0 by default)
              // so if we focus a cell, if this doesn't get canceled (by a `cursorSelection` event if offset > 0),
              // assume we are at the start & set our remote cursor there
              relayStatusDebounced({
                type: "cursor",
                cell_id: key,
                offset: 0,
              });
            });

            editor.onDidBlurEditorText(() => {
              if (!editor.hasWidgetFocus()) {
                relayStatusDebounced({
                  type: "idle",
                });
              }
            });

            model.onDidChangeContent(({ changes, isFlush }) => {
              if (isFlush) {
                return;
              }

              let value = model.getValue();

              relayChanges({
                changes: {
                  value,
                  range: {
                    startOffset: 0,
                    endOffset: 0,
                  },
                },
                cell_id: key,
                offset: model.getOffsetAt(editor.getPosition()!),
              });
            });
          });
        },
        (state) => state.editors
      ),
    ];

    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  useListener("friends", ({ body: { friends: newFriends } }) => {
    updateFriends((draft) => {
      Object.values(newFriends).forEach((friend) => {
        const { id, status } = friend;

        if (status.type === "joined" || !draft[id]) {
          if (!draft[id]) {
            draft[id] = friend;
          }
          return;
        }

        if (status.type === "left") {
          delete draft[id];
          return;
        }

        if (status.type === "cursor" && status.changes) {
          let editor = useEditorRefs.getState().editors[status.cell_id];
          if (!editor) {
            return;
          }

          let model = editor.getModel();
          if (!model) {
            return;
          }

          let position = editor.getPosition();

          model.setValue(status.changes.value);

          if (position) {
            editor.setPosition(position);
          }
        }

        draft[id] = {
          ...(draft[id] ?? {}),
          ...friend,
        };
      });
    });
  });

  const friendsArray = Object.values(friends);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${friendsArray.length}, 1fr)`,
        columnGap: 10,
      }}
    >
      <Transition
        items={friendsArray}
        keys={(friend) => friend.id}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {({ animal, color }) => (style) => (
          <div style={style}>
            <Animal animal={animal} color={color} />
          </div>
        )}
      </Transition>
      {friendsArray.map((friend) => {
        const { id, status } = friend;

        if (status.type === "cursor") {
          return (
            <RemoteCursor
              key={`cursor-${id}`}
              friend={
                friend as typeof friend & {
                  status: { type: "cursor" };
                }
              }
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default Friends;
