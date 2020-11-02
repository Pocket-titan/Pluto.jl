import * as monaco from "monaco-editor";
import create, { State, StateCreator } from "zustand";
import produce from "immer";
import _ from "lodash";
import type { Cell } from "./types";

/** Makes immer work with zustand (definitely did not write this myself) */
const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

/** Not all properties are always defined on cells we get, so we merge 'em with this default one */
const defaultCell: DeepPartial<Cell> = {
  // cell_id: "", // A cell should *always* come with its `cell_id`!
  input: {
    code: "",
    folded: false,
  },
  output: undefined,
  queued: false,
  running: false,
  errored: false,
  runtime: 0,
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/** This holds the notebooks cells & methods to manipulate them */
const useNotebook = create<{
  cells: Cell[];
  addCells: (
    cells: (Pick<Cell, "cell_id"> & DeepPartial<Cell>)[],
    index: number
  ) => void;
  deleteCells: (ids: string[]) => void;
  changeCells: (cells: (Pick<Cell, "cell_id"> & DeepPartial<Cell>)[]) => void;
  moveCells: (ids: string[], index: number) => void;
}>(
  immer((set, get) => ({
    cells: [],
    addCells: (cells, index = 0) => {
      set((draft) => {
        let cellsWithDefaults = cells.map((cell) =>
          _.defaultsDeep(Object.assign({}, cell), defaultCell)
        );

        draft.cells.splice(index, 0, ...cellsWithDefaults);
      });
    },
    deleteCells: (ids) => {
      set((draft) => {
        ids.forEach((id) => {
          let index = draft.cells.findIndex(({ cell_id }) => cell_id === id);

          if (index === -1) {
            return;
          }

          draft.cells.splice(index, 1);
        });
      });
    },
    changeCells: (cells) => {
      set((draft) => {
        cells.forEach((cell) => {
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
    moveCells: (ids, index) => {
      set((draft) => {
        let indices = ids
          .map((id) => draft.cells.findIndex(({ cell_id }) => cell_id === id))
          .filter((id) => id !== -1);

        let removed = _.pullAt(draft.cells, indices);
        draft.cells.splice(index, 0, ...removed);
      });
    },
  }))
);

/** Which cells are selected, stored by their `cell_id` */
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

const useDarkMode = create<{
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
}>((set, get) => ({
  mode: Array.from(document.body.classList.values()).includes("dark")
    ? "dark"
    : "light",
  setMode: (mode) => {
    set({
      mode,
    });
    monaco.editor.setTheme(
      mode === "dark" ? "atom-one-dark" : "atom-one-light"
    );
  },
}));

type Config = {
  [key: string]: any;
};

const useConfig = create<{
  config: Config;
  updateConfig: (key: string, value: any) => void;
  saveConfig: () => void;
}>(
  immer((set, get) => ({
    config: localStorage.getItem("config") || {},
    updateConfig: (key, value) => {
      set(({ config }) => {
        config[key] = value;
      });
    },
    saveConfig: () => {
      localStorage.setItem("config", JSON.stringify(get().config));
    },
  }))
);

export { useNotebook, useSelection, useEditorRefs, useDarkMode, useConfig };
