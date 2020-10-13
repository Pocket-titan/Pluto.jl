import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { listen } from "vscode-ws-jsonrpc";
import { useLocation } from "react-router-dom";
import CellView from "../components/Cell";
import _ from "lodash";
import produce from "immer";
import create, { State, StateCreator } from "zustand";
import type { Id, Cell } from "../ts/types";
import { useListener, send, useSocket, createWebsocket } from "../ts/pluto";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SelectionArea from "../components/SelectionArea";

// Jesus
const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

const getNotebookId = (): Id => {
  let notebook_id = new URLSearchParams(window.location.search).get("id");

  if (!notebook_id) {
    console.error("Failed to get notebook id");
    return "";
  }

  return notebook_id;
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const useNotebook = create<{
  cells: Cell[];
  notebook_id: Id;
  addCell: (cell: Cell, index: number) => void;
  deleteCell: (cell_id: Id) => void;
  changeCells: (cells: DeepPartial<Cell>[]) => void;
  setCells: (cells: Cell[]) => void;
  moveCells: (cell_ids: Id[], index: number) => void;
  selectCells: (cell_ids: Id[]) => void;
}>(
  immer((set, get) => ({
    cells: [],
    notebook_id: getNotebookId(),
    addCell: (cell, index) => {
      set(({ cells }) => {
        cells.splice(index, 0, cell);
      });
    },
    deleteCell: (cell_id) => {
      set(({ cells }) => {
        let index = cells.findIndex((cell) => cell.cell_id === cell_id);

        if (index !== -1) {
          cells.splice(index, 1);
        }
      });
    },
    changeCells: (new_cells) => {
      set(({ cells }) => {
        new_cells.forEach((new_cell) => {
          let index = cells.findIndex(
            (cell) => cell.cell_id === new_cell.cell_id
          );

          if (index === -1) {
            return;
          }

          _.merge(cells[index], new_cell);
        });
      });
    },
    setCells: (new_cells) => {
      set(() => ({
        cells: new_cells,
      }));
    },
    moveCells: (cell_ids, index) => {
      set(({ cells }) => {
        let new_cells = cell_ids
          .map((cell_id) => cells.findIndex((cell) => cell.cell_id === cell_id))
          .filter((index) => index !== -1)
          .reduce((cells, startIndex, delta) => {
            let endIndex = index + delta;
            return reorder(cells, startIndex, endIndex);
          }, cells);

        return {
          cells: new_cells,
        };
      });
    },
    selectCells: (cell_ids) => {
      set((draft) => {
        draft.cells.forEach((cell) => {
          cell.selected = cell_ids.includes(cell.cell_id);
        });
      });
    },
  }))
);

const reorder = <T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Notebook = () => {
  const {
    cells,
    notebook_id,
    setCells,
    changeCells,
    addCell,
    deleteCell,
    moveCells,
    selectCells,
  } = useNotebook();
  const socket = useSocket((state) => state.socket);

  useEffect(() => {
    let init = async () => {
      let wave = await send("connect", { notebook_id });
      let cell_list = await send("get_all_cells", { notebook_id });
      const { message } = cell_list;
      setCells(message.cells);

      Promise.all(
        message.cells.map(({ cell_id }) =>
          send("get_input", {
            notebook_id: notebook_id,
            cell_id,
          })
        )
      ).then((inputs) => {
        changeCells(
          inputs.map(({ cell_id, message: input }) => {
            return {
              cell_id,
              input,
            };
          })
        );
      });

      Promise.all(
        message.cells.map(({ cell_id }) =>
          send("get_output", {
            notebook_id: notebook_id,
            cell_id,
          })
        )
      ).then((outputs) => {
        changeCells(
          outputs.map(({ cell_id, message }) => {
            return {
              cell_id,
              ...message,
            };
          })
        );
      });
    };

    init();
  }, []);

  useListener("cell_input", ({ cell_id, message: input }) => {
    changeCells([
      {
        cell_id,
        input,
      },
    ]);
  });

  useListener("cell_output", ({ cell_id, message }) => {
    changeCells([
      {
        cell_id,
        ...message,
      },
    ]);
  });

  useListener("cell_added", ({ cell_id, message: { index } }) => {
    addCell(
      {
        cell_id,
        queued: false,
        errored: false,
        running: false,
        selected: false,
        output: {
          body: "",
        },
      },
      index
    );
  });

  useListener("cell_deleted", ({ cell_id }) => {
    deleteCell(cell_id);
  });

  useListener("cell_folded", ({ cell_id, message: { folded } }) => {
    changeCells([
      {
        cell_id,
        input: {
          folded,
        },
      },
    ]);
  });

  useListener("cells_moved", ({ initiator_id, message: { cells, index } }) => {
    let fromMyself = initiator_id === socket.client_id;

    if (fromMyself) {
      return;
    }

    moveCells(cells, index);
  });

  useListener("cell_queued", ({ cell_id }) => {
    changeCells([
      {
        cell_id,
        queued: true,
      },
    ]);
  });

  return (
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

            const newCells = reorder(cells, source.index, destination.index);

            send("move_multiple_cells", {
              notebook_id,
              body: {
                cells: [cells[source.index].cell_id],
                index: destination.index,
              },
            });

            setCells(newCells);
            selectCells([]);
          }}
        >
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <main
                style={{ gridColumn: 2 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cells.map((cell, index) => (
                  <CellView
                    key={cell.cell_id}
                    cell={cell}
                    index={index}
                    notebook_id={notebook_id}
                  />
                ))}
              </main>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      <Footer />
    </div>
  );
};

export default Notebook;
