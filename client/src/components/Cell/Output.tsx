import React from "react";
import styled, { css } from "styled-components/macro";
import type { Cell } from "../../ts";

const StyledOutput = styled.div`
  position: relative;
  display: flex;
  padding: 0em 0.75em 0em 0.75em;
  font-size: 16;
  transition: all 250ms ease-in-out;

  ${({ theme }) =>
    theme.isDark
      ? css`
          background-color: hsl(223, 15%, 12%);
          color: hsl(0, 0%, 70%);
        `
      : css`
          background-color: hsl(0, 0%, 80%);
        `}
  h1,
    h2, h3, h4 {
    margin: 0.25em 0px;
  }

  pre,
  p {
    margin: 0.5em 0px;
  }
`;

const Body = ({ body, mime }: { body: string; mime: string }) => {
  switch (mime) {
    default: {
      return body ? (
        <div>
          <pre>
            <code>{body}</code>
          </pre>
        </div>
      ) : (
        <div></div>
      );
    }
  }
};

const Output = ({ cell: { output } }: { cell: Cell }) => {
  if (!output) {
    return null;
  }

  const { body, mime, rootassignee, last_run_timestamp } = output;

  return (
    <StyledOutput>
      {rootassignee && (
        <div>
          <pre>
            <code>{<>{rootassignee}&nbsp;=&nbsp;</>}</code>
          </pre>
        </div>
      )}
      <Body body={body} mime={mime} />
    </StyledOutput>
  );
};

export default Output;
