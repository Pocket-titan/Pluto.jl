import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "./MonacoEditor";

const Input = ({
  code = "",
  folded = false,
}: Partial<import("../ts/pluto").CellInput>) => {
  return <MonacoEditor value={code} />;
};

const Output = ({
  output: newOutput = {
    body: "",
    mime: "text/markdown",
    rootassignee: null,
  },
}: Partial<import("../ts/pluto").CellOutput>) => {
  const [output, setOutput] = useState(newOutput);
  const lastOutput = useRef(newOutput);

  useEffect(() => {
    if (lastOutput.current !== newOutput) {
      setOutput(newOutput);
    }

    lastOutput.current = newOutput;
  }, [newOutput]);

  return (
    <div
      style={{
        backgroundColor: "hsl(0, 0%, 96%)",
        padding: "0.5em",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: output.body }} />
    </div>
  );
};

const Cell = ({ cell }: { cell: import("../ts/pluto").Cell }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: "1em",
      }}
    >
      <Output {...cell.output} />
      <Input {...cell.input} />
    </div>
  );
};

export default Cell;
