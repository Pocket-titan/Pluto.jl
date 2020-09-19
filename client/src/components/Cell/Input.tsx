import React from "react";
import { CellInput } from "../../types";
import MonacoEditor from "../MonacoEditor";

const Input = ({ value = "" }: { value?: CellInput }) => {
  return <MonacoEditor />;
};

export default Input;
