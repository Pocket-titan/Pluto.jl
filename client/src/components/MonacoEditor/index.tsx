import React, { useState, useEffect, useRef } from "react";
import { MonacoServices } from "monaco-languageclient";
import * as monaco from "monaco-editor";
import { get_actions } from "./actions";
import { initMonaco, liftOff } from "./julia_monaco";

const LANGUAGE_ID = "julia";

const default_options: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: LANGUAGE_ID,
  theme: "onedark",
  minimap: {
    enabled: false,
  },
  scrollbar: {
    vertical: "hidden",
  },
  scrollBeyondLastLine: false,
  tabSize: 2,
  autoIndent: "full",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  autoClosingOvertype: "always",
  renderWhitespace: "all",
  fontSize: 20,
};

// hackyyy
declare global {
  interface Window {
    __monaco_is_loaded: boolean;
    __monaco_is_languageclient_installed: boolean;
  }
}

if (!window.__monaco_is_loaded) {
  initMonaco();
  liftOff();
  window.__monaco_is_loaded = true;
}

const MonacoEditor = ({ id = "not_so_random_id", value = "thing = 50" }) => {
  const containerElement = useRef<HTMLDivElement>();
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    editor.current = monaco.editor.create(containerElement.current!, {
      value,
      ...default_options,
    });

    // if (!window.__monaco_is_languageclient_installed) {
    // MonacoServices.install(editor.current, { rootUri: "/" }); // install the languageclient
    // window.__monaco_is_languageclient_installed = true;
    // }

    updateHeight();

    let actions = get_actions(id);
    for (let action of actions) {
      editor.current.addAction(action);
    }

    editor.current.onDidChangeModelDecorations(() => {
      updateHeight(); // typing
      requestAnimationFrame(updateHeight); // folding
    });

    return () => {
      editor.current!.dispose();
    };
  }, []);

  const updateHeight = () => {
    if (!editor.current) {
      return;
    }

    let editorElement = editor.current.getDomNode()!;

    const lineHeight = editor.current.getOption(
      monaco.editor.EditorOption.lineHeight
    );
    const lineCount = editor.current.getModel()?.getLineCount() || 1;
    const newHeight =
      editor.current.getTopForLineNumber(lineCount + 1) + lineHeight;

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
        height: height || "100%",
      }}
    />
  );
};

export default MonacoEditor;
