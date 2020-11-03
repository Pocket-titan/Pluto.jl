import create from "zustand";
import _ from "lodash";
import immer from "./immer";
import type { Cell, DeepPartial } from "../";

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

export default useNotebook;

export { useNotebook, defaultCell };
