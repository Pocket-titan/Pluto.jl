import MonacoEditor from "components/MonacoEditor";
import type { Cell } from "ts/types";

const Input = ({ cell }: { cell: Cell }) => {
  return (
    <pluto-input>
      <MonacoEditor cell={cell} />
    </pluto-input>
  );
};

export default Input;
