import React from "react";
import Cell from "../components/Cell";
import dedent from "dedent";
import { usePluto } from "../ts/hooks";

const Notebook = () => {
  const socket = usePluto((state) => state.socket);

  if (!socket) {
    return null;
  }

  socket.onclose = () => console.log("socket closed!");

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
          <Cell
            cell={{
              id: "0",
              position: 0,
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
              `,
              output: "output!",
            }}
          />
        </main>
      </main>
    </div>
  );
};

export default Notebook;
