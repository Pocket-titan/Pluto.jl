import create from "zustand";

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

export default useSelection;

export { useSelection };
