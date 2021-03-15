import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import React, { useEffect, useMemo, useRef } from "react";
import {
  applyRemotePatches,
  moveCells,
  redo,
  resetNotebook,
  undo,
  useCellWidth,
  useNotebook,
} from "ts/state";
import { getNotebookId, updateRecentNotebooks } from "ts/utils";
import { sendNotification, sendRequest, useListener } from "ts/socket";

import Cell from "components/Cell";
import Header from "components/Header";
import { HotKeys } from "react-hotkeys";
import type { NotebookData } from "ts/types";
import SelectionArea from "components/SelectionArea";
import { WindowEvent } from "components/Elements";
import _ from "lodash";

import "mathjax/es5/tex-mml-chtml";
// console.log(`m`, m);

// @ts-ignore
window.MathJax = {
  options: {
    ignoreHtmlClass: "no-MαθJax",
    processHtmlClass: "tex",
  },
  startup: {
    typeset: true,
    ready: () => {
      // @ts-ignore
      window.MathJax.startup.defaultReady();
      console.log("mathjax ready?");
    },
  },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
  },
  svg: {
    fontCache: "global",
  },
};

const makeCells = ({
  cell_order,
  cell_inputs,
  cell_results,
}: NotebookData): import("ts/types").Cell[] => {
  return cell_order.map((cell_id) => {
    const input = _.defaults(cell_inputs[cell_id] ?? {}, {
      cell_id,
      code: "",
      code_folded: false,
    });

    const result = _.defaults(cell_results[cell_id] ?? {}, {
      queued: false,
      running: false,
      errored: false,
      runtime: undefined,
      output: undefined,
    });

    return {
      ...result,
      cell_id,
      input,
    };
  });
};

const CellList = React.memo(function CellList({
  cells,
  snapshot: { isDraggingOver },
}: {
  cells: import("ts/types").Cell[];
  snapshot: DroppableStateSnapshot;
}) {
  return (
    <>
      {cells.map((cell, index) => {
        const { cell_id } = cell;

        return (
          <Draggable draggableId={cell_id} key={cell_id} index={index}>
            {(provided, snapshot) => (
              <Cell
                provided={provided}
                snapshot={snapshot}
                index={index}
                cell={cell}
                // This makes sure that the animations from `react-beautiful-dnd` aren't suuuper laggy
                // TODO what's the performance impact of having this on lots of cells?
                style={isDraggingOver ? { willChange: "transform" } : {}}
              />
            )}
          </Draggable>
        );
      })}
    </>
  );
});

const keyMap = {
  DELETE_CELL: ["del", "backspace"],
};

const handlers = {};

const Notebook = ({ notebook_id = getNotebookId() }) => {
  const notebook = useNotebook(_.iteratee("notebook"));
  const setCellWidth = useCellWidth((state) => state.setWidth);
  const oldPath = useRef<string>(notebook.path);

  useEffect(() => {
    if (
      notebook.path !== oldPath.current &&
      _.isString(notebook.path) &&
      notebook.path !== "..."
    ) {
      updateRecentNotebooks(notebook.path, oldPath.current);
      oldPath.current = notebook.path;
    }
  }, [notebook.path]);

  useEffect(() => {
    const main = async () => {
      await sendRequest("connect", { notebook_id });
      await sendNotification("update_notebook", {
        notebook_id,
        body: {
          updates: [],
        },
      });

      sendRequest("friends", {
        notebook_id,
        body: { type: "joined" },
      });

      sendRequest("complete", {
        notebook_id,
        body: {
          query: "sq",
        },
      });

      const leave = () => {
        sendRequest("friends", {
          notebook_id,
          body: { type: "left" },
        });
      };

      window.addEventListener("beforeunload", leave);

      return leave;
    };

    main();

    return () => resetNotebook();
  }, [notebook_id]);

  useListener("notebook_diff", ({ body: { patches: _patches, response } }) => {
    const patches = _patches.map((patch) => _.omit(patch, "notebook_id"));

    if (response) {
      if (response.update_went_well === "👎") {
        console.error(response);
      }
    }

    applyRemotePatches(patches);
  });

  const cells = useMemo(() => makeCells(notebook), [notebook]);

  return (
    <HotKeys>
      <WindowEvent
        name="resize"
        handler={() => {
          const firstCell = document.querySelector("pluto-cell");

          if (!firstCell) {
            return;
          }

          setCellWidth(firstCell.clientWidth);
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridTemplateColumns: "1fr",
          height: "100vh",
        }}
      >
        <SelectionArea />
        <Header />
        <main
          style={{
            display: "grid",
            gridTemplateRows: "1fr",
            gridTemplateColumns: "1fr 60% 1fr",
          }}
        >
          <DragDropContext
            onDragEnd={({ source, destination }) => {
              if (!destination) {
                return;
              }

              const cell_id = notebook.cell_order[source.index];

              // Pluto uses some kind of internal logic which requires this
              moveCells(
                [cell_id],
                destination.index > source.index
                  ? destination.index + 1
                  : destination.index
              );
            }}
          >
            <div>
              <button onClick={() => undo()}>UNDO</button>
              <button onClick={() => redo()}>REDO</button>
            </div>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <main
                  style={{ gridColumn: 2 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <CellList cells={cells} snapshot={snapshot} />
                  {provided.placeholder}
                </main>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </div>
    </HotKeys>
  );
};

export default Notebook;
