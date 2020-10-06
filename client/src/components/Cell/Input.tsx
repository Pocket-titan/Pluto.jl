import React from "react";
import MonacoEditor from "../MonacoEditor";
import type { CellInput, Id } from "../../ts/types";

const Input = ({
  input: { code, folded } = {
    code: "",
    folded: false,
  },
  cell_id,
  notebook_id,
}: {
  input?: CellInput;
  cell_id: Id;
  notebook_id: Id;
}) => {
  return (
    <MonacoEditor value={code} cell_id={cell_id} notebook_id={notebook_id} />
  );
};

export default Input;
