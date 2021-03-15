import create from "zustand";

const useCellWidth = create<{
  width: number;
  setWidth: (newWidth: number) => void;
}>((set, get) => ({
  width: 0,
  setWidth: (newWidth) => void set({ width: newWidth }),
}));

export default useCellWidth;

export { useCellWidth };
