import React from "react";
import type { CellOutput } from "../../ts/types";

const Output = ({
  output = {
    body: "",
    mime: "text/markdown",
    rootassignee: null,
  },
}: {
  output?: CellOutput;
}) => {
  return (
    <div
      style={{
        display: "flex",
        color: "hsl(0, 0%, 70%)",
        backgroundColor: "hsl(244, 9%, 21%)",
        padding: "0.4em 1em 0.4em 1em",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: output.body }} />
    </div>
  );
};

export default Output;
