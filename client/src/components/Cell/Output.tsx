import React from "react";
import styled, { css } from "styled-components/macro";
import type { Cell, Mime } from "ts/types";
import { outputMap } from "./Outputs";

// import mathjax from "mathjax";

// mathjax.init().then((mathjax: any) => {
//   console.log(`mathjax`, mathjax);
// });

const StyledOutput = styled("pluto-output")`
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

const Body = ({ body, mime }: { body: any; mime: Mime }) => {
  const Component = outputMap[mime];

  if (Component) {
    return <Component body={body} mime={mime} />;
  }

  console.error(
    `Couldn't find a Component to show output with mimetype: ${mime} and body: ${JSON.stringify(
      body,
      null,
      2
    )}`
  );

  return <div />;
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
      <Body body={body} mime={mime as Mime} />
    </StyledOutput>
  );
};

export default React.memo(
  Output,
  function areEqual(
    { cell: { output: oldOutput } },
    { cell: { output: newOutput } }
  ) {
    // Apparently we receive the next `rootassignee` before we get the actual next output,
    // so we prevent a weird rerender with this
    if (oldOutput?.body === newOutput?.body) {
      return true;
    }

    return false;
  }
);
