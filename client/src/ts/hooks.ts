import * as monaco from "monaco-editor";
import create, { State, StateCreator } from "zustand";
import { useLocation } from "react-router-dom";
import produce from "immer";
import _ from "lodash";
import type { Cell } from "./types";

// Makes immer work with zustand (definitely did not write this myself)
const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

const useNotebook = create<{
  cells: Cell[];
  addCells: (cells: Cell[]) => void;
  deleteCells: (ids: string[]) => void;
  changeCells: (cells: (Pick<Cell, "cell_id"> & Partial<Cell>)[]) => void;
}>(
  immer((set, get) => ({
    cells: [],
    addCells: (cells) => {
      cells.forEach((cell) => {
        set((draft) => {
          draft.cells.push(cell);
        });
      });
    },
    deleteCells: (ids) => {
      ids.forEach((id) => {
        set((draft) => {
          let index = draft.cells.findIndex(({ cell_id }) => cell_id === id);

          if (index === -1) {
            return;
          }

          draft.cells.splice(index, 1);
        });
      });
    },
    changeCells: (cells) => {
      cells.forEach((cell) => {
        set((draft) => {
          let index = draft.cells.findIndex(
            ({ cell_id }) => cell_id === cell.cell_id
          );

          if (index === -1) {
            return;
          }

          _.merge(draft.cells[index], cell);
        });
      });
    },
  }))
);

const useSelection = create<{
  selectedCells: string[];
  selectCells: (ids: string[]) => void;
}>((set, get) => ({
  selectedCells: [],
  selectCells: (ids) => {
    set({
      selectedCells: ids,
    });
  },
}));

const useEditors = create<{
  editors: {
    [id: string]: monaco.editor.IStandaloneCodeEditor;
  };
  setEditor: (id: string, editor: monaco.editor.IStandaloneCodeEditor) => void;
}>(
  immer((set, get) => ({
    editors: {},
    setEditor: (id, editor) => {
      set((draft) => {
        draft.editors[id] = editor;
      });
    },
  }))
);

function useNotebookId() {
  let notebook_id = new URLSearchParams(useLocation().search).get("id");

  if (!notebook_id) {
    throw new Error("Failed to get notebook id");
  }

  return notebook_id;
}

export { useNotebook, useSelection, useEditors, useNotebookId };
