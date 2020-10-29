import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Cell, useEditorRefs, useQueryParams } from "../../ts";
import settings, { GET_DEFAULT_THEME } from "./settings";
import { createActions } from "./actions";

const MonacoEditor = ({
  cell: {
    cell_id,
    input: { code, folded },
  },
}: {
  cell: Cell;
}) => {
  const containerElement = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const notebook_id = useQueryParams("id")!;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let model = monaco.editor.createModel(
      code,
      "julia",
      new monaco.Uri().with({ path: cell_id })
    );

    editor.current = monaco.editor.create(containerElement.current!, {
      model,
      theme: GET_DEFAULT_THEME(),
      ...settings,
    });

    useEditorRefs.getState().setEditorRef(cell_id, editor.current);

    let actions = createActions(notebook_id, cell_id);
    for (let action of actions) {
      editor.current.addAction(action);
    }

    // If we leave the editor, reset our selection in here
    editor.current.onDidBlurEditorText(() => {
      editor.current?.setSelection(new monaco.Range(0, 0, 0, 0));
    });

    editor.current.onDidContentSizeChange(({ contentHeight }) => {
      if (contentHeight !== height) {
        setHeight(contentHeight);
        editor.current?.layout();
      }
    });

    // This will inject the textmate CSS into the page, overriding monaco's own styles
    // so we do this here, after monaco has loaded
    if (!window.__monaco_is_loaded) {
      window.__on_monaco_loaded && window.__on_monaco_loaded();
      window.__monaco_is_loaded = true;
    }

    return () => {
      editor.current?.getModel()?.dispose();
      editor.current?.dispose();
    };
  }, []);

  useEffect(() => {
    let model = editor.current?.getModel();
    if (!editor.current || !model) {
      return;
    }

    if (code !== model.getValue()) {
      let position = editor.current.getPosition();
      // Use the "hardcore" way to apply, so we can't Ctrl+Z the initial value :P
      model.applyEdits([
        {
          range: model.getFullModelRange(),
          text: code,
          forceMoveMarkers: true,
        },
      ]);
      editor.current.setPosition(position || new monaco.Position(0, 0));
    }
  }, [code]);

  return (
    <div
      ref={containerElement}
      style={{
        width: "100%",
        height: folded ? 0 : height || "100%",
        display: folded ? "none" : "block",
      }}
    />
  );
};

export default MonacoEditor;
