import "./features";

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { Cell } from "ts/types";
import { createActions } from "./actions";
import { getNotebookId } from "ts/utils";
import settings from "./settings";
import { removeEditorRef, setEditorRef, useCellWidth } from "ts/state";

const MonacoEditor = ({
  cell: {
    cell_id,
    input: { code = "" },
  },
}: {
  cell: Cell;
}) => {
  const [isDirty, setIsDirty] = useState(false);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const lastVersionId = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);
  const width = useCellWidth((state) => state.width);

  const updateDimensions = useCallback(
    ({ width, height }: { width?: number; height?: number } = {}) => {
      if (!containerRef.current || !editor.current) {
        return;
      }

      width = width ?? containerRef.current.clientWidth;
      height = height ?? containerRef.current.clientHeight;

      editor.current.layout({
        width,
        height,
      });
    },
    []
  );

  useLayoutEffect(() => {
    updateDimensions({ width });
  }, [width, updateDimensions]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const modelUri = new monaco.Uri().with({ path: cell_id });
    const model =
      monaco.editor.getModel(modelUri) ??
      monaco.editor.createModel(code, "julia", modelUri);

    lastVersionId.current = model.getAlternativeVersionId();

    editor.current = monaco.editor.create(containerRef.current, {
      model,
      theme: "vs-dark",
      fontSize: 17,
      // Providing the dimension upfront should prevent the container from measuring itself (= expensive)
      dimension: {
        width,
        height: 0,
      },
      glyphMargin: true,
      ...settings,
    });

    let actions = createActions(getNotebookId(), cell_id);
    for (let action of actions) {
      editor.current.addAction(action);
    }

    editor.current.onDidContentSizeChange(
      ({ contentHeight, contentHeightChanged }) => {
        if (contentHeightChanged) {
          updateDimensions({ height: contentHeight });
        }
      }
    );

    let initialHeight = editor.current.getContentHeight();
    updateDimensions({ height: initialHeight });

    // editor.current.onDidBlurEditorText(() => {
    //   editor.current?.setSelection(new monaco.Range(0, 0, 0, 0));
    // });

    setEditorRef(cell_id, editor.current);

    return () => {
      removeEditorRef(cell_id);
      editor.current?.dispose();
    };
  }, []);

  // This is a `useLayoutEffect` instead of a `useEffect` b/c we want this to run before the `useEffect`
  // above - so we don't overwrite the code of a cell with the default "" if its model already exists
  // (1. make cell 2. write code 3. undo creation 4. redo creation -> now cell correctly has old value vs. the default "")
  useLayoutEffect(() => {
    let model = editor.current?.getModel();

    if (!editor.current || !model) {
      return;
    }

    if (code !== model.getValue()) {
      let position = editor.current.getPosition();

      model.applyEdits([
        {
          range: model.getFullModelRange(),
          text: code,
          forceMoveMarkers: true,
        },
      ]);

      editor.current.setPosition(position || new monaco.Position(0, 0));
    }

    lastVersionId.current = model.getAlternativeVersionId();
    setIsDirty(false);
  }, [code]);

  useEffect(() => {
    const model = editor.current?.getModel();

    if (!model) {
      return;
    }

    let listener = model.onDidChangeContent(() => {
      let versionId = model.getAlternativeVersionId();

      if (
        isDirty &&
        (versionId === lastVersionId.current || model.getValue() === code)
      ) {
        setIsDirty(false);
      } else if (!isDirty && versionId !== lastVersionId.current) {
        setIsDirty(true);
      }
    });

    return () => {
      listener.dispose();
    };
  }, [isDirty, code]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {isDirty && (
        <div
          style={{
            position: "absolute",
            left: -5,
            top: 0,
            height: 15,
            width: 3,
            background: "yellow",
          }}
        />
      )}
    </>
  );
};

export default React.memo(MonacoEditor);
