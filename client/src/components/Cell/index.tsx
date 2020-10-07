import React from "react";
import Input from "./Input";
import Output from "./Output";
import type { Id } from "../../ts/types";
import { send } from "../../ts/pluto";
import styled from "styled-components/macro";

const Container = styled.div`
  position: relative;
  margin-top: 1.94em;
`;

const Shoulder = styled.div`
  display: flex;
  cursor: move;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: -50vw;
  width: 50vw;
  height: 100%;

  &:hover {
    background: hsla(0, 0%, 100%, 0.03);
  }
`;

const Button = styled.button`
  transition: opacity 250ms ease-in-out;
  position: absolute;
  cursor: pointer;
  border: none;
  background: none;

  color: hsl(0, 0%, 55%);
  &:hover {
    color: hsl(0, 0%, 80%);
  }

  opacity: 0;
  ${Container}:hover & {
    opacity: 1;
  }
`;

const AddCell = styled(Button)<{ where: "before" | "after" }>`
  transform: ${({ where }) =>
    `translate(-50%, ${where === "before" ? "-100%" : "100%"})`};
  padding: 0.5em;
  left: 0;
  ${({ where }) => (where === "before" ? "top: 0;" : "bottom: 0;")}
`;

const FoldCell = styled(Button)`
  transform: translate(-100%, 0%);
  padding: 0em 0.25em 0em 0.25em;
  left: 0;
  top: 0;
  font-size: 20px;
`;

const Cell = ({
  cell,
  index,
  notebook_id,
}: {
  cell: import("../../ts/types").Cell;
  index: number;
  notebook_id: Id;
}) => {
  return (
    <Container>
      <Output cell={cell} />
      <Input cell={cell} {...{ notebook_id }} />
      <Shoulder />
      <AddCell
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
        <span>➕</span>
      </AddCell>
      <AddCell
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
        <span>➕</span>
      </AddCell>
      <FoldCell
        onClick={(event) => {
          send("fold_cell", {
            notebook_id,
            cell_id: cell.cell_id,
            body: {
              folded: !cell?.input?.folded,
            },
          });
        }}
      >
        <span>👁</span>
      </FoldCell>
    </Container>
  );
};

export default Cell;
