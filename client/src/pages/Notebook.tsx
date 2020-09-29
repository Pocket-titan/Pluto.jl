import React, { useEffect } from "react";
import Cell from "../components/Cell";
import dedent from "dedent";
import { Listener, send } from "../ts/pluto";

const Notebook = () => {
  useEffect(() => {
    send("get_all_notebooks");
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Listener
        update_type="notebook_list"
        listener={(event) => {
          console.log("I got it!!", event);
        }}
      />
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
          />
          <Cell
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
          />
        </main>
      </main>
    </div>
  );
};

export default Notebook;
