import { Add, Delete, Visibility, VisibilityOff } from "@styled-icons/material";
import {
  AddCell,
  Container,
  DeleteCell,
  FoldCell,
  Shoulder,
  TrafficLight,
} from "./styled";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import React, { useCallback } from "react";
import { addCells, deleteCells, foldCells } from "ts/state/useNotebook";

import Input from "./Input";
import Output from "./Output";
import { useFriends, useSelection } from "ts/state";
import _ from "lodash";

const Cell = ({
  cell,
  index,
  provided: { innerRef, draggableProps, dragHandleProps },
  snapshot: { isDragging, isDropAnimating },
  style = {},
}: {
  cell: import("ts/types").Cell;
  index: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  style?: React.CSSProperties;
}) => {
  const {
    cell_id,
    errored,
    queued,
    running,
    input: { code_folded },
  } = cell;
  const selected = useSelection(
    useCallback((state) => state.selectedCells.includes(cell_id), [cell_id])
  );
  const selectedByFriends = useFriends(
    useCallback(
      (state) =>
        Object.values(state.friends).filter(
          ({ status }) =>
            status.type === "selecting_cells" &&
            status.cell_ids.includes(cell_id)
        ),
      [cell_id]
    )
  );

  return (
    <Container
      id={cell_id}
      ref={innerRef}
      {...draggableProps}
      style={{
        ...draggableProps.style,
        ...style,
      }}
      // TODO: selection & colors by me & friends should be combined
      selected={selected}
      selectedByFriends={_.last(selectedByFriends)?.color}
    >
      <pluto-cell
        id={cell_id}
        style={{
          display: "block",
        }}
      >
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
        {!code_folded && <Input cell={cell} />}
        <AddCell
          title="Add cell"
          where="before"
          onClick={(event) => {
            addCells([index + 0]);
          }}
        >
          <Add size={22} />
        </AddCell>
        <AddCell
          title="Add cell"
          where="after"
          onClick={(event) => {
            addCells([index + 1]);
          }}
        >
          <Add size={22} />
        </AddCell>
        <FoldCell
          title={code_folded ? "Show code" : "Hide code"}
          onClick={(event) => {
            foldCells([cell_id]);
          }}
        >
          {code_folded ? <VisibilityOff size={22} /> : <Visibility size={22} />}
        </FoldCell>
        <DeleteCell
          title="Delete cell"
          onClick={(event) => {
            deleteCells([cell_id]);
          }}
        >
          <Delete size={22} />
        </DeleteCell>
      </pluto-cell>
    </Container>
  );
};

export default Cell;
