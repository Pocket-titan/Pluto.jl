import * as monaco from "monaco-editor";
import { KeyCode, KeyMod } from "monaco-editor";
import { sendNotification } from "ts/socket";

export function createActions(notebook_id: string, cell_id: string) {
  const actions: monaco.editor.IActionDescriptor[] = [
    {
      id: "run-cell",
      label: "Run cell",
      keybindings: [KeyMod.Shift | KeyCode.Enter],
      run: async (editor) => {
        sendNotification("change_cell", {
          notebook_id,
          cell_id,
          body: {
            code: editor.getModel()!.getValue(),
          },
        });
      },
    },
  ];

  return actions;
}
