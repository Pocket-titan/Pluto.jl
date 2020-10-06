import React from "react";
import Input from "./Input";
import Output from "./Output";

const Cell = ({
  cell,
  notebook_id,
}: { cell: import("../../ts/types").Cell } & { notebook_id: string }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "2em",
      }}
    >
      <Output output={cell.output} />
      <Input input={cell.input} {...{ cell_id: cell.cell_id, notebook_id }} />
    </div>
  );
};

export default Cell;
