import create from "zustand";
import * as monaco from "monaco-editor";
import { getProvider } from "../components/MonacoEditor";
import AtomOneLight from "../components/MonacoEditor/textmate/themes/atom-one-light";
import AtomOneDark from "../components/MonacoEditor/textmate/themes/atom-one-dark-theme";

export const useTheme = create<{
  theme: string | null;
  setTheme: (theme: string) => void;
}>((set, get) => ({
  theme: (() => {
    return Array.from(document.body.classList.values()).includes("dark")
      ? "dark"
      : "light";
  })(),
  setTheme: (newTheme) => {
    set({
      theme: newTheme,
    });

    monaco.editor.setTheme(
      newTheme === "light" ? "atom-one-light" : "atom-one-dark"
    );

    let provider = getProvider();
    if (provider) {
      provider.registry.setTheme(
        newTheme === "light" ? AtomOneLight : AtomOneDark
      );
      provider.injectCSS();
    }
  },
}));

declare global {
  interface Window {
    __theme: string;
    __setPreferredTheme: (theme: string) => void;
    __onThemeChange: (newTheme: string) => void;
  }
}

declare module "styled-components" {
  export interface DefaultTheme {
    isDark: boolean;
  }
}
