import * as monaco from "monaco-editor";
import create from "zustand";
import immer from "./immer";

/** The refs for our MonacoEditors: when a new one is created, it stores its ref in here */
const useEditorRefs = create<{
  editors: {
    [id: string]: monaco.editor.IStandaloneCodeEditor;
  };
  setEditorRef: (
    id: string,
    editor: monaco.editor.IStandaloneCodeEditor
  ) => void;
}>(
  immer((set, get) => ({
    editors: {},
    setEditorRef: (id, editor) => {
      set((draft) => {
        draft.editors[id] = editor;
      });
    },
  }))
);

export default useEditorRefs;

export { useEditorRefs };
