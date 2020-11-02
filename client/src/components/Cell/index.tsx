import React, { useCallback } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Add, Visibility, VisibilityOff, Delete } from "@styled-icons/material";
import {
  getQueryParams,
  sendNotification,
  sendRequest,
  useNotebook,
  useEditorRefs,
  useSelection,
} from "../../ts";
import {
  Container,
  Shoulder,
  TrafficLight,
  AddCell,
  DeleteCell,
  FoldCell,
} from "./styled";
import Input from "./Input";
import Output from "./Output";

async function addCell(index: number) {
  let notebook_id = getQueryParams("id")!;

  let newCell = await sendRequest("add_cell", {
    notebook_id,
    body: {
      index,
    },
  });

  useNotebook.getState().addCells(
    [
      {
        cell_id: newCell.cell_id,
      },
    ],
    index
  );

  // Zustand <333
  let unsub = useEditorRefs.subscribe(
    (
      editorRef: import("monaco-editor").editor.IStandaloneCodeEditor | null
    ) => {
      if (editorRef) {
        editorRef.focus();
        unsub();
      }
    },
    (state) => state.editors[newCell.cell_id]
  );
}

async function foldCell(cell_id: string, folded: boolean) {
  let notebook_id = getQueryParams("id")!;

  useNotebook.getState().changeCells([
    {
      cell_id,
      input: {
        folded,
      },
    },
  ]);

  sendNotification("fold_cell", {
    notebook_id,
    cell_id: cell_id,
    body: {
      folded,
    },
  });
}

async function deleteCell(cell_id: string) {
  let notebook_id = getQueryParams("id")!;

  useNotebook.getState().deleteCells([cell_id]);

  sendNotification("delete_cell", {
    notebook_id,
    cell_id,
  });
}

const Cell = ({
  cell,
  index,
  provided: { innerRef, draggableProps, dragHandleProps },
  snapshot: { isDragging, isDropAnimating },
}: {
  cell: import("../../ts/types").Cell;
  index: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) => {
  const {
    cell_id,
    errored,
    queued,
    running,
    input: { folded },
  } = cell;
  const selected = useSelection(
    useCallback((state) => state.selectedCells.includes(cell_id), [cell_id])
  );

  return (
    <Container
      id={cell_id}
      ref={innerRef}
      {...draggableProps}
      selected={selected}
    >
      <pluto-cell id={cell_id}>
        <Shoulder
          title="Drag to move cell"
          isDragging={isDragging}
          isDropAnimating={isDropAnimating}
          {...dragHandleProps}
        />
        <TrafficLight
          errored={Boolean(errored)}
          queued={Boolean(queued)}
          running={Boolean(running)}
        />
        <Output cell={cell} />
        <Input cell={cell} />
        <AddCell
          title="Add cell"
          where="before"
          onClick={(event) => {
            addCell(index + 0);
          }}
        >
          <Add size={22} />
        </AddCell>
        <AddCell
          title="Add cell"
          where="after"
          onClick={(event) => {
            addCell(index + 1);
          }}
        >
          <Add size={22} />
        </AddCell>
        <FoldCell
          title="Show/hide code"
          onClick={(event) => {
            foldCell(cell_id, !folded);
          }}
        >
          {folded ? <VisibilityOff size={22} /> : <Visibility size={22} />}
        </FoldCell>
        <DeleteCell
          title="Delete cell"
          onClick={(event) => {
            deleteCell(cell_id);
          }}
        >
          <Delete size={22} />
        </DeleteCell>
      </pluto-cell>
    </Container>
  );
};

export default Cell;
