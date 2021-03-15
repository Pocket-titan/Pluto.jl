import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { KeyCode, KeyMod } from "monaco-editor/esm/vs/editor/editor.api";
import { sendNotification } from "ts/socket";
import { runCells } from "ts/state";

export const createActions = (notebook_id: string, cell_id: string) => {
  const actions: monaco.editor.IActionDescriptor[] = [
    {
      id: "run-cell",
      label: "Run cell",
      keybindings: [KeyMod.Shift | KeyCode.Enter],
      run: async (editor) => {
        runCells([
          {
            cell_id,
            code: editor.getValue()!,
          },
        ]);
      },
    },
    {
      id: "reveal-lines",
      label: "Reveal lines",
      contextMenuGroupId: "pluto",
      run: (editor) => {
        let selection = editor.getSelection();
        if (!selection) {
          return;
        }

        sendNotification("trigger", {
          notebook_id,
          body: {
            source: "remote",
            handlerId: "remote-trigger-reveal-lines",
            payload: {
              cell_id,
              lineNumber: selection.startLineNumber,
            },
          },
        });

        // let pos = editor.getTopForLineNumber(selection.startLineNumber);
        // let rect = editor.getContainerDomNode().getBoundingClientRect();

        // window.scrollTo({
        //   top: pos + (rect.top + window.pageYOffset),
        //   behavior: "smooth",
        // });
      },
    },
  ];

  return actions;
};
