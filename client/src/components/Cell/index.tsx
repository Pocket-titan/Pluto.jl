import React from "react";
import styled from "styled-components/macro";
import Input from "./Input";
import Output from "./Output";

const Container = styled.div`
  position: relative;
  min-height: 23px;
`;

const Cell = ({ cell }: { cell: import("../../ts/types").Cell }) => {
  return (
    <Container>
      <Output cell={cell} />
      <Input cell={cell} />
    </Container>
  );
};

export default Cell;
