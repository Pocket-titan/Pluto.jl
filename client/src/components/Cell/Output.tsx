import React from "react";
import styled from "styled-components";

const StyledOutput = styled.div`
  background-color: hsl(0, 0%, 96%);
  padding: 0.5em;
`;

const Output = ({ value = "" }: { value?: string }) => {
  return <StyledOutput>{value}</StyledOutput>;
};

export default Output;
