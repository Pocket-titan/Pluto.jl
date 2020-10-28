import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useEditorRefs, useQueryParams } from "../../ts";
import type { Cell } from "../../ts";
import { createActions } from "./actions";
import settings, { GET_DEFAULT_THEME } from "./settings";

const MonacoEditor = ({ cell: { cell_id, input } }: { cell: Cell }) => {
  const containerElement = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const notebook_id = useQueryParams("id")!;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    editor.current = monaco.editor.create(containerElement.current!, {
      value: input.code,
      theme: GET_DEFAULT_THEME(),
      ...settings,
    });

    useEditorRefs.getState().setEditorRef(cell_id, editor.current);

    const lineHeight = editor.current.getOption(
      monaco.editor.EditorOption.lineHeight
    );
    if (lineHeight > height) {
      setHeight(lineHeight);
    }

    let actions = createActions(notebook_id, cell_id);
    for (let action of actions) {
      editor.current.addAction(action);
    }

    editor.current.onDidContentSizeChange(
      ({ contentHeight, contentHeightChanged }) => {
        if (contentHeightChanged) {
          setHeight(contentHeight);
          editor.current?.layout();
        }
      }
    );

    // This will inject the textmate CSS into the page, overriding monaco's own styles
    // so we do this here, after monaco has loaded
    if (!window.__monaco_is_loaded) {
      window.__on_monaco_loaded && window.__on_monaco_loaded();
      window.__monaco_is_loaded = true;
    }

    return () => {
      editor.current?.dispose();
    };
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
