import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CellView from "../components/Cell";
import _ from "lodash";
import produce from "immer";
import create, { State, StateCreator } from "zustand";
import type { Id, Cell } from "../ts/types";
import { useListener, send } from "../ts/pluto";

// Jesus
const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

const useNotebookId = () => {
  let notebook_id = new URLSearchParams(useLocation().search).get("id");

  if (!notebook_id) {
    throw new Error("Failed to get notebook id");
  }

  return notebook_id;
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const useNotebook = create<{
  cells: Cell[];
  addCell: (cell: Cell, index: number) => void;
  deleteCell: (cell_id: Id) => void;
  changeCells: (cells: DeepPartial<Cell>[]) => void;
  setCells: (cells: Cell[]) => void;
}>(
  immer((set, get) => ({
    cells: [],
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
  }))
);

const Notebook = () => {
  const notebook_id = useNotebookId();
  const { cells, setCells, changeCells, addCell, deleteCell } = useNotebook();

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
          outputs.map(({ cell_id, message: { output } }) => {
            return {
              cell_id,
              output,
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

  useListener("cell_output", ({ cell_id, message: { output } }) => {
    changeCells([
      {
        cell_id,
        output,
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

  return (
    <div style={{ minHeight: "100vh" }}>
      <nav />
      <main
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          width: "100%",
          display: "flex",
          maxWidth: "80rem",
        }}
      >
        <main style={{ flex: "1 1 0%" }}>
          {cells.map((cell, index) => {
            return (
              <CellView
                key={cell.cell_id}
                cell={cell}
                index={index}
                notebook_id={notebook_id}
              />
            );
          })}
        </main>
      </main>
    </div>
  );
};

export default Notebook;
