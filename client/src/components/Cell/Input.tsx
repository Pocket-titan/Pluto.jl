import React from "react";
import MonacoEditor from "../MonacoEditor";
import type { Cell } from "../../ts/types";

const Input = ({ cell }: { cell: Cell }) => {
  return <MonacoEditor cell={cell} />;
};

export default Input;
