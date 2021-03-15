import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import create from "zustand";
import immer from "./immer";

const useEditorRefs = create<{
  editors: {
    [id: string]: monaco.editor.IStandaloneCodeEditor;
  };
  setEditorRef: (
    id: string,
    editor: monaco.editor.IStandaloneCodeEditor
  ) => void;
  removeEditorRef: (id: string) => void;
}>(
  immer((set, get) => ({
    editors: {},
    setEditorRef: (id, editor) => {
      set((draft) => {
        draft.editors[id] = editor;
      });
    },
    removeEditorRef: (id) => {
      set((draft) => {
        if (draft.editors[id]) {
          delete draft.editors[id];
        }
      });
    },
  }))
);

const setEditorRef = (
  id: string,
  editor: monaco.editor.IStandaloneCodeEditor
) => {
  useEditorRefs.getState().setEditorRef(id, editor);
};

const removeEditorRef = (id: string) => {
  useEditorRefs.getState().removeEditorRef(id);
};

export { useEditorRefs, setEditorRef, removeEditorRef };

export default useEditorRefs;
