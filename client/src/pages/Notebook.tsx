import React, { useEffect } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sendRequest, useListener, useNotebook, useQueryParams } from "../ts";
import { initMonaco } from "../components/MonacoEditor/textmate";
import SelectionArea from "../components/SelectionArea";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cell from "../components/Cell";

function Notebook() {
  let notebook_id = useQueryParams("id")!;
  let { cells, addCells, changeCells, deleteCells, moveCells } = useNotebook();

  useEffect(() => {
    initMonaco().then((provider) => {
      if (!provider) {
        return; // This is only necessary so react-refresh doesn't crash the app 🙃
      }

      if (!window.__monaco_is_loaded) {
        window.__on_monaco_loaded = () => {
          provider.injectCSS();
        };
      } else {
        provider.injectCSS();
      }
    });
  }, []);

  useEffect(() => {
    if (cells.length > 0) {
      return; // This is only necessary so react-refresh doesn't crash the app 🙃
    }

    async function init() {
      await sendRequest("connect", { notebook_id });
      let {
        body: { cells },
      } = await sendRequest("get_all_cells", { notebook_id });
      let ids = cells.map(({ cell_id }) => cell_id);

      let [inputs, outputs] = await Promise.all([
        Promise.all(
          ids.map((cell_id) =>
            sendRequest("get_input", { notebook_id, cell_id })
          )
        ),
        Promise.all(
          ids.map((cell_id) =>
            sendRequest("get_output", { notebook_id, cell_id })
          )
        ),
      ]);

      let newCells = ids.map((cell_id, index) => ({
        cell_id,
        input: inputs[index].body,
        ...outputs[index].body,
      }));

      addCells(newCells, 0);
    }

    init();
  }, []);

  useListener("cell_input", ({ cell_id, body: input }) => {
    changeCells([
      {
        cell_id,
        input,
      },
    ]);
  });

  useListener("cell_output", ({ cell_id, body }) => {
    changeCells([
      {
        cell_id,
        ...body,
      },
    ]);
  });

  useListener("cell_queued", ({ cell_id }) => {
    changeCells([
      {
        cell_id,
        queued: true,
      },
    ]);
  });

  useListener("cell_added", ({ cell_id, body: { index } }) => {
    addCells(
      [
        {
          cell_id,
        },
      ],
      index
    );
  });

  useListener("cell_deleted", ({ cell_id }) => {
    deleteCells([cell_id]);
  });

  useListener("cell_folded", ({ cell_id, body: { folded } }) => {
    changeCells([
      {
        cell_id,
        input: {
          folded,
        },
      },
    ]);
  });

  useListener("cells_moved", ({ body: { cells, index } }) => {
    moveCells(cells.map(_.property("cell_id")), index);
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

            let { cell_id } = cells[source.index];

            moveCells([cell_id], destination.index);
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
                  <Draggable
                    draggableId={cell.cell_id}
                    key={cell.cell_id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Cell
                        provided={provided}
                        snapshot={snapshot}
                        index={index}
                        cell={cell}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </main>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      <Footer />
    </div>
  );
}

export default Notebook;
