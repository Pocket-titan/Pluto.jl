import React, { useState, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import styled from "styled-components/macro";
import _ from "lodash";
import parse from "html-react-parser";
import type { Cell, MimeType } from "../../ts/types";
import { delay } from "../../ts/utils";

// Suspense?!1
const wrapPromise = <T extends unknown>(promise: Promise<T>) => {
  let status = "pending";
  let response: T | Error;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

const ErrorMessage = ({
  msg,
  stacktrace,
}: {
  msg?: string;
  stacktrace?: string;
}) => {
  return <div>{msg}</div>;
};

const Jltree = ({ body }: { body: string }) => {
  let Tree = _.omit(parse(body), ["class", "onjltreeclick"]);
  console.log("body", body);

  if (Tree instanceof Array) {
    return null;
  }

  return Tree as JSX.Element;
};

const Body = ({ mime, body }: { mime: MimeType; body: string }) => {
  switch (mime) {
    case "image/png":
    case "image/jpeg":
    case "image/gif":
    case "image/bmp":
    case "image/svg+xml": {
      const src = URL.createObjectURL(new Blob([body], { type: mime }));
      return (
        <div>
          <img src={src} />
        </div>
      );
    }
    case "text/html":
    case "application/vnd.pluto.tree+xml": {
      return <Jltree body={body} />;
    }
    case "application/vnd.pluto.stacktrace+json": {
      return <ErrorMessage {...JSON.parse(body)} />;
    }
    case "text/plain":
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

const RawHTMLContainer = ({ body }: { body: string }) => (
  <div dangerouslySetInnerHTML={{ __html: body }} />
);

const StyledOutput = styled.div`
  position: relative;
  display: flex;
  color: hsl(0, 0%, 70%);
  background-color: hsl(223, 15%, 12%);
  padding: 0em 1em 0em 1em;
  font-size: 16;

  h1,
  h2,
  h3,
  h4 {
    margin: 0.25em 0px;
  }

  pre,
  p {
    margin: 0.5em 0px;
  }
`;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const Output = ({
  cell: {
    output: { body, mime, rootassignee } = {
      body: "",
      mime: "text/markdown",
      rootassignee: null,
    },
  },
}: {
  cell: Cell;
}) => {
  let [elements, setElements] = useState<JSX.Element[]>();
  let firstMount = useRef(true);

  const colorizeAssignee = async () => {
    let colorized = await monaco.editor.colorize(
      `${rootassignee} = `,
      "julia",
      {}
    );

    let parsed = parse(colorized);

    setElements(parsed instanceof Array ? parsed : [parsed]);
  };

  useEffect(() => {
    const onFirstMount = async () => {
      // Apparently the output can load before monaco has "really" loaded a theme,
      // so we wait a bit on first mount. TODO: more graceful solution
      await delay(25);
      colorizeAssignee();
    };

    if (rootassignee !== null) {
      if (firstMount.current) {
        onFirstMount();
        firstMount.current = false;
      } else {
        colorizeAssignee();
      }
    }
  }, [rootassignee]);

  return (
    <StyledOutput>
      {rootassignee && (
        <div>
          <pre>
            <code>{elements || <>{rootassignee}&nbsp;=&nbsp;</>}</code>
          </pre>
        </div>
      )}
      <Body body={body} mime={mime!} />
    </StyledOutput>
  );
};

export default Output;
