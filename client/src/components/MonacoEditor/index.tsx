import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import settings from "./settings";
import { useEditors } from "../../ts/hooks";
import type { Cell } from "../../ts/types";

const MonacoEditor = ({ cell: { cell_id } }: { cell: Cell }) => {
  const containerElement = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const setEditor = useEditors((state) => state.setEditor);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    editor.current = monaco.editor.create(containerElement.current!, {
      value: "",
      theme: "atom-one-dark",
      language: "julia",
      ...settings,
    });

    setTimeout(() => {
      monaco.editor.setTheme("atom-one-light");
    }, 4000);

    setEditor(cell_id, editor.current);

    const lineHeight = editor.current.getOption(
      monaco.editor.EditorOption.lineHeight
    );
    if (lineHeight > height) {
      setHeight(lineHeight);
    }

    editor.current.onDidContentSizeChange(
      ({ contentHeight, contentHeightChanged }) => {
        if (contentHeightChanged) {
          setHeight(contentHeight);
          editor.current?.layout();
        }
      }
    );
  }, []);

  return (
    <div
      ref={containerElement}
      style={{
        width: "100%",
        height: height || "100%",
      }}
    />
  );
};

export default MonacoEditor;
