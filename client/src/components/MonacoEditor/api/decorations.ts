import * as monaco from "monaco-editor";
import { css } from "glamor";

let testRule = css({
  ":after": {
    content: "@4.2.0",
    background: "#f06",
    borderRadius: 10,
    color: "hsl(0, 0%, 10%)",
    padding: 5,
  },
});

export const createDecoration = (): monaco.editor.IModelDecoration => {
  return {
    id: "9",
    ownerId: 9,
    range: new monaco.Range(1, 4, 1, 8),
    options: {
      afterContentClassName: `${testRule}`,
    },
  };
};
