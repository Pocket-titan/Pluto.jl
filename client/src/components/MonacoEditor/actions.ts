import { KeyCode, KeyMod } from "monaco-editor";

export const get_actions = (id: string) => {
  const actions: import("monaco-editor").editor.IActionDescriptor[] = [
    {
      id: "run-cell",
      label: "Run cell",
      keybindings: [KeyMod.Shift | KeyCode.Enter],
      run: (editor) => {
        console.log("ran action on editor with id:", id, "!");
      },
    },
  ];

  return actions;
};
