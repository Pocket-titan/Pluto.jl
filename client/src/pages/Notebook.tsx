import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cell from "../components/Cell";
import produce from "immer";
import dedent from "dedent";
// import { useListener, send } from "../ts/pluto";
import { useSocket, useListener, send } from "../ts/pluto";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Notebook = () => {
  const query = useQuery();
  const [cells, setCells] = useState<import("../ts/pluto").Cell[]>([]);
  let notebook_id = query.get("id");

  useEffect(() => {
    let init = async () => {
      if (!notebook_id) {
        return;
      }

      let wave = await send("connect", {
        notebook_id,
      });
      let cell_list = await send("get_all_cells", {
        notebook_id,
      });
      setCells(cell_list.message.cells);
      cell_list.message.cells.forEach(async ({ cell_id }) => {
        await send("get_input", {
          notebook_id: notebook_id!,
          cell_id,
        });
        await send("get_output", {
          notebook_id: notebook_id!,
          cell_id,
        });
      });
    };

    init();
  }, []);

  useListener("cell_input", (event) => {
    let cell_id = event.cell_id!;

    setCells(
      produce(cells, (draftCells) => {
        let index = draftCells.findIndex((cell) => cell.cell_id === cell_id);

        if (index === -1) {
          return;
        }

        draftCells[index].input = event.message;
      })
    );
  });

  useListener("cell_output", (event) => {
    let cell_id = event.cell_id!;

    setCells(
      produce(cells, (draftCells) => {
        let index = draftCells.findIndex((cell) => cell.cell_id === cell_id);

        if (index === -1) {
          return;
        }

        draftCells[index].output = event.message;
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
            return <Cell key={cell.cell_id} cell={cell} />;
          })}
          {/* <Cell
            cell={{
              id: "1",
              position: 1,
              state: "DONE",
              folded: false,
              input: dedent`
                function hello(x::Int)
                  println(x)
                end

                mutable struct hey
                  y::StridedArray
                end

                thing = hey()

                hello(420)

                begin
                  local i = 0
                  matrix = [1 2; 3 4]
                end

                @warn "You are too cool for school"

                what = 5 |> hello

                md"Single line md should not break things below function end"

                struct test
                end

                md"
                Multiline markdown! begin end @macro
                "

                function z()
                end
              `,
              output: "output!",
            }}
          /> */}
        </main>
      </main>
    </div>
  );
};

export default Notebook;
