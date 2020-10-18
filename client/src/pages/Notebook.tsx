import React, { useEffect } from "react";
import _ from "lodash";
import Cell from "../components/Cell";
import { sendMessage, sendNotification, useListener } from "../ts/pluto";
import { useNotebook, useNotebookId } from "../ts/hooks";
import { initMonaco } from "../components/MonacoEditor/textmate";

initMonaco();

const Notebook = () => {
  let notebook_id = useNotebookId();
  let { cells, addCells, deleteCells, changeCells } = useNotebook();

  useEffect(() => {
    let init = async () => {
      await sendMessage("connect");
      let cell_list = await sendMessage("get_all_cells", { notebook_id });
      let ids = cell_list.cells.map(({ cell_id }) => cell_id);
      let [inputs, outputs] = await Promise.all([
        Promise.all(
          ids.map((cell_id) =>
            sendMessage("get_input", { notebook_id, cell_id })
          )
        ),
        Promise.all(
          ids.map((cell_id) =>
            sendMessage("get_output", { notebook_id, cell_id })
          )
        ),
      ]);

      let cells = ids.map((cell_id, index) => ({
        cell_id,
        ...inputs[index],
        output: outputs[index],
      }));

      addCells(cells);
    };

    init();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {cells.map((cell) => (
        <Cell key={cell.cell_id} cell={cell} />
      ))}
    </div>
  );
};

export default Notebook;
