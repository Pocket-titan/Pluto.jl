import React, { useState } from "react";
import Input from "./Input";
import Output from "./Output";
import type { Id } from "../../ts/types";
import { send } from "../../ts/pluto";
import styled from "styled-components/macro";
import { Add, Eye, EyeOff, Trash } from "@styled-icons/ionicons-outline";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

const Container = styled.div`
  position: relative;
  margin-top: 2.04em;
  box-shadow: 3px 3px 9px hsla(0, 0%, 0%, 0.25);
  min-height: 23px; /* TODO: maybe do editor.getOption() instead of hardcoding */
`;

const Shoulder = styled.div<{ isDragging: boolean; isDropAnimating: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: -50vw;
  width: 150vw;
  height: 100%;
  z-index: 0;

  &:hover {
    cursor: move;
    background: hsla(0, 0%, 100%, 0.03);
  }

  ${({ isDragging, isDropAnimating }) =>
    (isDragging || isDropAnimating) &&
    `
      cursor: move;
      background: hsla(0, 0%, 100%, 0.03);
  `}
`;

const Button = styled.button`
  transition: opacity 250ms ease-in-out;
  cursor: pointer;
  position: absolute;
  border: none;
  background: none;

  * {
    color: hsl(0, 0%, 60%);
  }

  &:hover {
    * {
      color: hsl(0, 0%, 75%);
    }
  }

  opacity: 0;
  ${Container}:hover & {
    opacity: 1;
  }

  ${Container}:focus & {
    opacity: 0;
  }
`;

const AddCell = styled(Button)<{ where: "before" | "after" }>`
  transform: ${({ where }) =>
    `translate(-50%, ${where === "before" ? "-100%" : "100%"})`};
  padding: 0.4em;
  left: 0;
  ${({ where }) => (where === "before" ? "top: 0;" : "bottom: 0;")}
`;

const FoldCell = styled(Button)`
  transform: translate(-100%, 0%);
  padding: 0em 0.25em 0em 0.25em;
  left: 0;
  top: 0;
`;

const DeleteCell = styled(Button)`
  transform: translate(100%, 0%);
  right: 0;
  top: 0;
`;

const Cell = ({
  cell,
  index,
  notebook_id,
  provided: { innerRef, draggableProps, dragHandleProps },
  snapshot: { isDragging, isDropAnimating },
}: React.ComponentProps<typeof DraggableCell> & {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) => (
  <Container ref={innerRef} {...draggableProps}>
    <Shoulder
      title="Drag to move cell"
      isDragging={isDragging}
      isDropAnimating={isDropAnimating}
      {...dragHandleProps}
    />
    <Output cell={cell} />
    <Input cell={cell} notebook_id={notebook_id} />
    <AddCell
      title="Add cell"
      where="before"
      onClick={(event) => {
        send("add_cell", {
          notebook_id,
          body: {
            index: index + 0,
          },
        });
      }}
    >
      <Add size={22} />
    </AddCell>
    <AddCell
      title="Add cell"
      where="after"
      onClick={(event) => {
        send("add_cell", {
          notebook_id,
          body: {
            index: index + 1,
          },
        });
      }}
    >
      <Add size={22} />
    </AddCell>
    <FoldCell
      title="Show/hide code"
      onClick={(event) => {
        send("fold_cell", {
          notebook_id,
          cell_id: cell.cell_id,
          body: {
            folded: !cell.input?.folded,
          },
        });
      }}
    >
      {cell.input?.folded ? <EyeOff size={22} /> : <Eye size={22} />}
    </FoldCell>
    <DeleteCell
      title="Delete cell"
      onClick={(event) => {
        send("delete_cell", {
          notebook_id,
          cell_id: cell.cell_id,
        });
      }}
    >
      <Trash size={22} />
    </DeleteCell>
  </Container>
);

const DraggableCell = (props: {
  cell: import("../../ts/types").Cell;
  index: number;
  notebook_id: Id;
}) => (
  <Draggable
    draggableId={props.cell.cell_id}
    key={props.cell.cell_id}
    index={props.index}
  >
    {(provided, snapshot) => (
      <Cell provided={provided} snapshot={snapshot} {...props} />
    )}
  </Draggable>
);

export default DraggableCell;
