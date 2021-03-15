import { getNotebookId, uuid } from "ts/utils";
import produce, {
  Patch,
  applyPatches,
  enablePatches,
  produceWithPatches,
} from "immer";
import { sendNotification, sendRequest } from "ts/socket";

import type { NotebookData } from "ts/types";
import type { WritableDraft } from "immer/dist/internal";
import _ from "lodash";
import create from "zustand";
import { css } from "styled-components/macro";
import useEditorRefs from "./useEditorRefs";

enablePatches();

const STACK_SIZE = 30;

const trimStackIfNeeded = <T>(stack: T[]): T[] => {
  if (stack.length > STACK_SIZE) {
    return stack.slice(stack.length - STACK_SIZE);
  }

  return stack;
};

const defaultNotebook: NotebookData = {
  bonds: {},
  cell_inputs: {},
  cell_order: [],
  cell_results: {},
  in_temp_dir: true,
  path: "...",
  shortpath: "",
};

const useNotebook = create<{
  notebook: NotebookData;
  resetNotebook: () => void;
  undo: () => void;
  redo: () => void;
  history: { patches: Patch[]; inversePatches: Patch[] }[];
  historyIndex: number;
  applyRemotePatches: (patches: Patch[]) => void;
  updateNotebook: (
    fn: (notebook: WritableDraft<NotebookData>) => void,
    options?: {
      isUndoable?: boolean;
      sendToServer?: boolean;
      ignoreOwnUpdate?: boolean;
    }
  ) => Promise<void>;
}>((set, get) => ({
  notebook: defaultNotebook,
  resetNotebook: () => void set({ notebook: defaultNotebook }),
  history: [],
  historyIndex: 0,
  undo: () => {
    const { notebook, history, historyIndex } = get();

    if (historyIndex === 0) {
      return;
    }

    let { inversePatches } = history[historyIndex - 1];

    const nextNotebook = produce(notebook, (draft) => {
      applyPatches(draft, inversePatches);
    });

    sendRequest("update_notebook", {
      notebook_id: getNotebookId(),
      body: {
        updates: inversePatches,
      },
    });

    set({
      notebook: nextNotebook,
      historyIndex: historyIndex - 1,
    });
  },
  redo: () => {
    const { notebook, history, historyIndex } = get();

    if (historyIndex === history.length) {
      return;
    }

    let { patches } = history[historyIndex];

    const nextNotebook = produce(notebook, (draft) => {
      applyPatches(draft, patches);
    });

    sendRequest("update_notebook", {
      notebook_id: getNotebookId(),
      body: {
        updates: patches,
      },
    });

    set({
      notebook: nextNotebook,
      historyIndex: historyIndex + 1,
    });
  },
  applyRemotePatches: (patches) => {
    if (patches.length === 0) {
      return;
    }

    // console.group(
    //   "%cApplying remote patches",
    //   css`
    //     background: linear-gradient(to right, #d38312, #a83279);
    //     padding: 2px;
    //     border-radius: 1px;
    //     color: white;
    //   `.join("")
    // );
    // for (let patch of patches) {
    //   console.group(`Patch :${patch.op}`);
    //   console.log(`Path: ${patch.path}`);
    //   console.log("Value:", patch.value);
    //   console.groupEnd();
    // }
    // console.groupEnd();

    set(({ notebook }) => ({
      notebook: applyPatches(notebook, patches),
    }));
  },
  updateNotebook: async (
    updateFn,
    { isUndoable = true, sendToServer = true, ignoreOwnUpdate = false } = {
      isUndoable: true,
      sendToServer: true,
      ignoreOwnUpdate: false,
    }
  ) => {
    const { notebook, history, historyIndex } = get();

    const [nextNotebook, patches, inversePatches] = produceWithPatches(
      notebook,
      (draftNotebook) => {
        updateFn(draftNotebook);

        // If we happen to delete our last cell, immediately create a new one
        if (draftNotebook.cell_order.length === 0) {
          let cell_id = uuid();

          draftNotebook.cell_inputs[cell_id] = {
            cell_id,
            code: "",
            code_folded: false,
          };

          draftNotebook.cell_order = [cell_id];
        }
      }
    );

    if (patches.length === 0) {
      return;
    }

    // console.group(
    //   "%cApplying _own_ patches",
    //   css`
    //     background: linear-gradient(to right, #a83279, #d38312);
    //     padding: 2px;
    //     border-radius: 1px;
    //     color: white;
    //   `.join("")
    // );
    // for (let patch of patches) {
    //   console.group(`Patch :${patch.op}`);
    //   console.log(`Path: ${patch.path}`);
    //   console.log("Value:", patch.value);
    //   console.groupEnd();
    // }
    // for (let patch of inversePatches) {
    //   console.group(`InversePatch :${patch.op}`);
    //   console.log(`Path: ${patch.path}`);
    //   console.log("Value:", patch.value);
    //   console.groupEnd();
    // }
    // console.groupEnd();

    set({
      notebook: nextNotebook,
      ...(isUndoable
        ? {
            historyIndex: historyIndex + 1,
            history: [
              ...history.slice(0, historyIndex + 1),
              { patches, inversePatches },
            ],
          }
        : {}),
    });

    if (sendToServer) {
      let message = {
        notebook_id: getNotebookId(),
        body: {
          updates: patches,
        },
      };

      if (ignoreOwnUpdate) {
        await sendRequest("update_notebook", message);
      } else {
        sendNotification("update_notebook", message);
      }
    }
  },
}));

const undo = () => void useNotebook.getState().undo();

const redo = () => void useNotebook.getState().redo();

const resetNotebook = () => void useNotebook.getState().resetNotebook();

const applyRemotePatches = (patches: Patch[]) =>
  void useNotebook.getState().applyRemotePatches(patches);

const addCells = async (indexes: number[]) => {
  if (indexes.length === 0) {
    return;
  }

  let ids = indexes.map(() => uuid());

  let unsubscribe = useEditorRefs.subscribe(
    (
      editorRef?: import("monaco-editor/esm/vs/editor/editor.api").editor.IStandaloneCodeEditor
    ) => {
      if (editorRef) {
        editorRef.focus();
        unsubscribe();
      }
    },
    (state) => state.editors[ids[0]]
  );

  useNotebook.getState().updateNotebook((notebook) => {
    for (let [index, cell_id] of _.zip(indexes, ids) as [number, string][]) {
      notebook.cell_inputs[cell_id] = {
        cell_id,
        code: "",
        code_folded: false,
      };

      // notebook.cell_order.splice(index, 0, cell_id);
      // NOTE: the line above does not work, because the "add" jsonpatch op isn't implemented
      // correctly on the backend (looks like adding to Arrays doesn't work well).
      // So this way, we force a "replace" op, which does work
      notebook.cell_order = [
        ...notebook.cell_order.slice(0, index),
        cell_id,
        ...notebook.cell_order.slice(index),
      ];
    }
  });
};

const deleteCells = (ids: string[]) => {
  useNotebook.getState().updateNotebook((notebook) => {
    for (let cell_id of ids) {
      delete notebook.cell_inputs[cell_id];
    }

    notebook.cell_order = notebook.cell_order.filter((id) => !ids.includes(id));
  });

  sendNotification("run_multiple_cells", {
    notebook_id: getNotebookId(),
    body: {
      cells: [],
    },
  });
};

const foldCells = (ids: string[], fold?: boolean) => {
  useNotebook.getState().updateNotebook(
    (notebook) => {
      for (let cell_id of ids) {
        notebook.cell_inputs[cell_id].code_folded = _.isUndefined(fold)
          ? !notebook.cell_inputs[cell_id].code_folded
          : fold;
      }
    },
    { isUndoable: false }
  );
};

const moveCells = (ids: string[], index: number) => {
  useNotebook.getState().updateNotebook(
    (notebook) => {
      let before = notebook.cell_order
        .slice(0, index)
        .filter((id) => !ids.includes(id));

      let after = notebook.cell_order
        .slice(index)
        .filter((id) => !ids.includes(id));

      notebook.cell_order = [...before, ...ids, ...after];
    },
    { ignoreOwnUpdate: true }
  );
};

const runCells = async (cells: { cell_id: string; code?: string }[]) => {
  const { updateNotebook } = useNotebook.getState();

  updateNotebook(
    (notebook) => {
      for (let { cell_id } of cells) {
        if (notebook.cell_results[cell_id]) {
          notebook.cell_results[cell_id].queued = true;
        } else {
          // nothing
        }
      }
    },
    { isUndoable: false, sendToServer: false }
  );

  if (
    cells.map(_.iteratee("code")).filter((code) => !_.isUndefined(code))
      .length > 0
  ) {
    // Do we need to await this? Should always happen before the run, right?
    updateNotebook(
      (notebook) => {
        for (let { cell_id, code } of cells) {
          if (code) {
            notebook.cell_inputs[cell_id].code = code;
          }
        }
      },
      { isUndoable: false }
    );
  }

  sendNotification("run_multiple_cells", {
    notebook_id: getNotebookId(),
    body: {
      cells: cells.map(_.iteratee("cell_id")),
    },
  });
};

export default useNotebook;

export {
  addCells,
  applyRemotePatches,
  deleteCells,
  foldCells,
  moveCells,
  redo,
  resetNotebook,
  runCells,
  undo,
  useNotebook,
};
