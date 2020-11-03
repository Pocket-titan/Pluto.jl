import * as monaco from "monaco-editor";
import create from "zustand";

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

export default useDarkMode;

export { useDarkMode };
