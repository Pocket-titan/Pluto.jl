import React from "react";
import type { Cell, MimeType } from "../../ts/types";

const ErrorMessage = ({
  msg,
  stacktrace,
}: {
  msg?: string;
  stacktrace?: string;
}) => {
  return (
    <div>
      {msg}
      {stacktrace}
    </div>
  );
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
      return <RawHTMLContainer body={body} />;
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

const Output = ({
  cell: {
    output: { body, mime } = {
      body: "",
      mime: "text/markdown",
      rootassignee: null,
    },
  },
}: {
  cell: Cell;
}) => {
  return (
    <div
      style={{
        display: "flex",
        color: "hsl(0, 0%, 70%)",
        backgroundColor: "hsl(244, 9%, 21%)",
        padding: "0em 1em 0em 1em",
      }}
    >
      <Body body={body} mime={mime!} />
    </div>
  );
};

export default Output;
