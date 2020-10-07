import React from "react";
import MonacoEditor from "../MonacoEditor";
import type { Cell, Id } from "../../ts/types";

const Input = ({
  cell: {
    cell_id,
    input: { code, folded } = {
      code: "",
      folded: false,
    },
  },
  notebook_id,
}: {
  cell: Cell;
  notebook_id: Id;
}) => {
  return (
    <MonacoEditor
      value={code}
      cell_id={cell_id}
      notebook_id={notebook_id}
      folded={folded}
    />
  );
};

export default Input;
