import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CellView from "../components/Cell";
import produce from "immer";
import type { Cell } from "../ts/types";
import { useListener, send } from "../ts/pluto";

const useNotebookId = () => {
  let notebook_id = new URLSearchParams(useLocation().search).get("id");

  if (!notebook_id) {
    throw new Error("Failed to get notebook id");
  }

  return notebook_id;
};

const Notebook = () => {
  const notebook_id = useNotebookId();
  const [cells, setCells] = useState<Cell[]>([]);

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
        setCells(
          produce((draftCells: Cell[]) => {
            inputs.forEach((input) => {
              let cell_id = input.cell_id;
              let index = draftCells.findIndex(
                (cell) => cell.cell_id === cell_id
              );

              if (index === -1) {
                return;
              }

              draftCells[index].input = input.message;
            });
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
        setCells(
          produce((draftCells: Cell[]) => {
            outputs.forEach((output) => {
              let cell_id = output.cell_id;
              let index = draftCells.findIndex(
                (cell) => cell.cell_id === cell_id
              );

              if (index === -1) {
                return;
              }

              // Watch the difference between input & output!
              // A `cell_output` event also has data for on the cell itself, instead of
              // just for the `output` key (whereas `cell_input` only modifies `input`).
              draftCells[index] = {
                ...draftCells[index],
                ...output.message,
              };
            });
          })
        );
      });
    };

    init();
  }, []);

  useListener("cell_input", (update) => {
    let cell_id = update.cell_id;

    setCells(
      produce((draftCells: Cell[]) => {
        let index = draftCells.findIndex((cell) => cell.cell_id === cell_id);

        if (index === -1) {
          return;
        }

        draftCells[index].input = update.message;
      })
    );
  });

  useListener("cell_output", (update) => {
    let cell_id = update.cell_id;

    setCells(
      produce((draftCells: Cell[]) => {
        let index = draftCells.findIndex((cell) => cell.cell_id === cell_id);

        if (index === -1) {
          return;
        }

        draftCells[index].output = update.message.output;
      })
    );
  });

  useListener("cell_added", (update) => {
    let { index } = update.message;
    let cell = {
      cell_id: update.cell_id,
      queued: false,
      errored: false,
      running: false,
      output: {
        body: "",
      },
    };

    setCells(
      produce((draftCells: Cell[]) => {
        draftCells.splice(index, 0, cell);
      })
    );
  });

  useListener("cell_deleted", ({ cell_id }) => {
    setCells(
      produce((draftCells: Cell[]) => {
        let index = draftCells.findIndex((cell) => cell.cell_id === cell_id);

        if (index !== -1) {
          draftCells.splice(index, 1);
        }
      })
    );
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
          {cells.map((cell) => {
            return (
              <CellView
                key={cell.cell_id}
                cell={cell}
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
