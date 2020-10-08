import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { MonacoServices } from "monaco-languageclient";
import * as monaco from "monaco-editor";
import { initMonaco } from "./textmate";
// import { initMonaco, liftOff } from "./julia_monaco";
import { KeyCode, KeyMod } from "monaco-editor";
import { send } from "../../ts/pluto";
import type { Id } from "../../ts/types";
import { SimpleLanguageInfoProvider } from "./textmate/providers";
import { registerProviders } from "./providers";
// import Parser from "web-tree-sitter";
import atom_one_dark from "./themes/One Dark.json";

const default_options: monaco.editor.IStandaloneEditorConstructionOptions = {
  // theme doesn't actually matter i think since we manually set this in
  // ./textmate/index.ts
  theme: "atom-one-dark",
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  wrappingStrategy: "advanced",
  wrappingIndent: "same",
  automaticLayout: true,
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
    alwaysConsumeMouseWheel: false,
  },
  scrollBeyondLastLine: false,
  tabSize: 2,
  autoIndent: "full",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  autoClosingOvertype: "always",
  fontSize: 17,
  renderLineHighlightOnlyWhenFocus: true,
  renderIndentGuides: false,
  overviewRulerLanes: 0,
  lineNumbersMinChars: 3,
  padding: {
    top: 0,
    bottom: 0,
  },
  smoothScrolling: true,
};

// hackyyy
declare global {
  interface Window {
    __monaco_is_loaded: boolean;
    __monaco_is_languageclient_installed: boolean;
  }
}

let provider: SimpleLanguageInfoProvider;
if (!window.__monaco_is_loaded) {
  monaco.editor.defineTheme("atom-one-dark", atom_one_dark as any);
  initMonaco("julia").then((languageProvider) => {
    provider = languageProvider;
  });
  registerProviders();
  window.__monaco_is_loaded = true;
}

const MonacoEditor = ({
  notebook_id,
  cell_id,
  value = "",
  folded = false,
}: {
  notebook_id: Id;
  cell_id: Id;
  value?: string;
  folded?: boolean;
}) => {
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const containerElement = useRef<HTMLDivElement>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let model = editor.current?.getModel();
    if (!editor.current || !model) {
      return;
    }

    if (value !== model.getValue()) {
      editor.current.executeEdits("", [
        {
          range: model.getFullModelRange(),
          text: value,
          forceMoveMarkers: true,
        },
      ]);
      editor.current.pushUndoStop();
    }
  }, [value]);

  useEffect(() => {
    let model = monaco.editor.createModel(
      value,
      "julia",
      new monaco.Uri().with({ path: cell_id })
    );

    editor.current = monaco.editor.create(containerElement.current!, {
      model,
      ...default_options,
    });

    provider?.injectCSS();

    // if (!window.__monaco_is_languageclient_installed) {
    // MonacoServices.install(editor.current, { rootUri: "/" }); // install the languageclient
    // window.__monaco_is_languageclient_installed = true;
    // }

    updateHeight();

    const actions: monaco.editor.IActionDescriptor[] = [
      {
        id: "run-cell",
        label: "Run cell",
        keybindings: [KeyMod.Shift | KeyCode.Enter],
        run: (editor) => {
          send("change_cell", {
            notebook_id,
            cell_id,
            body: {
              code: editor.getModel()!.getValue(),
            },
          });
        },
      },
    ];

    for (let action of actions) {
      editor.current.addAction(action);
    }

    editor.current.onDidChangeModelDecorations(() => {
      updateHeight(); // typing
      requestAnimationFrame(updateHeight); // folding
    });

    return () => {
      editor.current?.getModel()?.dispose();
      editor.current?.dispose();
    };
  }, []);

  const updateHeight = () => {
    let editorElement = editor.current?.getDomNode();
    if (!editor.current || !editorElement) {
      return;
    }

    const lineHeight = editor.current.getOption(
      monaco.editor.EditorOption.lineHeight
    );
    const lineCount = editor.current.getModel()?.getLineCount() || 1;
    const range = editor.current.getModel()?.getFullModelRange();
    const newHeight = lineCount * lineHeight;

    if (height !== newHeight) {
      setHeight(newHeight);
      editorElement.style.height = `${newHeight}px`;
      editor.current.layout();
    }
  };

  return (
    <div
      ref={(ref: HTMLDivElement) => (containerElement.current = ref)}
      style={{
        width: "100%",
        height: folded ? 0 : height || "100%",
        display: folded ? "none" : "block",
      }}
    />
  );
};

export default MonacoEditor;
