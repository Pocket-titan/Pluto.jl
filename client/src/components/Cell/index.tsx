import React from "react";
import styled from "styled-components";
import Input from "./Input";
import Output from "./Output";

const StyledCell = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
`;

const Cell = ({ cell }: { cell: import("../../types").Cell }) => {
  return (
    <StyledCell>
      <Output value={cell.output} />
      <Input value={cell.input} />
    </StyledCell>
  );
};

export default Cell;
