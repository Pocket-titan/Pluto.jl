import React, { useState, useEffect, useRef, useCallback } from "react";
import * as monaco from "monaco-editor";
import { initMonaco } from "./textmate";
// import { initMonaco, liftOff } from "./julia_monaco";
import { KeyCode, KeyMod } from "monaco-editor";
import { send } from "../../ts/pluto";
import type { Id } from "../../ts/types";
import { SimpleLanguageInfoProvider } from "./textmate/providers";
import { registerProviders } from "./api/providers";
// import Parser from "web-tree-sitter";
import atom_one_dark from "./themes/One Dark.json";
import atom_one_light from "./themes/One Light.json";
import { createDecoration } from "./api/decorations";
import { useNotebook } from "../../pages/Notebook";

const default_options: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  wrappingStrategy: "advanced",
  wrappingIndent: "same",
  automaticLayout: true,
  foldingHighlight: false,
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
    alwaysConsumeMouseWheel: false,
  },
  lineNumbers: "off",
  scrollBeyondLastLine: false,
  tabSize: 2,
  autoIndent: "full",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  autoClosingOvertype: "always",
  matchBrackets: "near",
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

// TODO: right now this is called for *each* MonacoEditor instance...
let provider: SimpleLanguageInfoProvider;
if (!window.__monaco_is_loaded) {
  monaco.editor.defineTheme("atom-one-dark", atom_one_dark as any);
  monaco.editor.defineTheme("atom-one-light", atom_one_light as any);
  initMonaco("julia").then((languageProvider) => {
    provider = languageProvider;
  });
  registerProviders();
  window.__monaco_is_loaded = true;
}
export let getProvider = () => provider;

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
  const setEditorRef = useNotebook(
    useCallback((state) => state.setEditorRef, [])
  );
  const containerElement = useRef<HTMLDivElement>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    let model = editor.current?.getModel();
    if (!editor.current || !model) {
      return;
    }

    if (value !== model.getValue()) {
      const position = editor.current.getPosition();
      // Use the "hardcore" way to apply, so we can't Ctrl+Z the initial value :P
      model.applyEdits([
        {
          range: model.getFullModelRange(),
          text: value,
          forceMoveMarkers: true,
        },
      ]);
      editor.current.setPosition(position || new monaco.Position(0, 0));
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
      theme: window.__theme === "dark" ? "atom-one-dark" : "atom-one-light",
      ...default_options,
    });

    setEditorRef(cell_id, editor.current);

    // This makes our token colors work again b/c of textmate stuff
    provider?.injectCSS();

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
      {
        id: "test",
        label: "Test",
        run: (editor) => {
          let decoration = createDecoration();
          editor.deltaDecorations([], [decoration]);
        },
      },
    ];

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

    editor.current.onDidBlurEditorText(() => {
      editor.current?.setSelection(new monaco.Range(0, 0, 0, 0));
    });

    const lineHeight = editor.current.getOption(
      monaco.editor.EditorOption.lineHeight
    );
    if (lineHeight > height) {
      setHeight(lineHeight);
    }

    return () => {
      editor.current?.getModel()?.dispose();
      editor.current?.dispose();
    };
  }, []);

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
