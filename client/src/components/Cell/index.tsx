import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Output from "./Output";
import { Cell } from "../../types";

const StyledCell = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
`;

const _Cell = ({ cell }: { cell: Cell }) => {
  return (
    <StyledCell>
      <Output value={cell.output} />
      <Input value={cell.input} />
    </StyledCell>
  );
};

export default _Cell;
