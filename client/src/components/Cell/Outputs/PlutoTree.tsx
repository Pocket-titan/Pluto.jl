import { Mime } from "ts/types";

const PlutoTree = ({
  body,
}: {
  body: {
    elements: [index: number, element: [value: string, mime: Mime]][];
    objectid: string;
    prefix: string;
    type:
      | "Array"
      | "Dict"
      | "Pair"
      | "Tuple"
      | "NamedTuple"
      | "circular"
      | "struct";
  };
}) => {
  return <div></div>;
};

export default PlutoTree;
