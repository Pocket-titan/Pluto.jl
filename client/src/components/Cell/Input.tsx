import React from "react";
import MonacoEditor from "../MonacoEditor";

const Input = (props: React.ComponentProps<typeof MonacoEditor>) => {
  return <MonacoEditor {...props} />;
};

export default Input;
