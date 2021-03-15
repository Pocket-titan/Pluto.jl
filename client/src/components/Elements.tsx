import { useCallback, useEffect } from "react";

import styled from "styled-components/macro";

export const DocumentEvent = <K extends keyof DocumentEventMap>({
  handler,
  name,
  targets = undefined,
  passive = undefined,
  capture = false,
}: {
  handler: (event: DocumentEventMap[K]) => void;
  name: K;
  targets?: (elements: Element[]) => boolean;
  passive?: boolean;
  capture?: boolean;
}) => {
  let fn = useCallback(
    (event: DocumentEventMap[K]) => {
      if (targets) {
        let path = event.composedPath() as Element[];
        if (!targets(path)) {
          return;
        }
      }

      if (passive === false) {
        event.preventDefault();
      }

      handler(event);
    },
    [passive, targets, handler]
  );

  useEffect(() => {
    document.addEventListener(name, fn, { capture });

    return () => {
      document.removeEventListener(name, fn, { capture });
    };
  }, [fn, name, capture, passive]);

  return null;
};

export const WindowEvent = <K extends keyof WindowEventMap>({
  handler,
  name,
  targets = undefined,
  passive = undefined,
  capture = false,
}: {
  handler: (event: WindowEventMap[K]) => void;
  name: K;
  targets?: (elements: Element[]) => boolean;
  passive?: boolean;
  capture?: boolean;
}) => {
  let fn = useCallback(
    (event: WindowEventMap[K]) => {
      if (targets) {
        let path = event.composedPath() as Element[];
        if (!targets(path)) {
          return;
        }
      }

      if (passive === false) {
        event.preventDefault();
      }

      handler(event);
    },
    [passive, targets, handler]
  );

  useEffect(() => {
    window.addEventListener(name, fn, { capture });

    return () => {
      window.removeEventListener(name, fn, { capture });
    };
  }, [fn, name, capture, passive]);

  return null;
};

const SPINNER_RADIUS = 18;

// Graciously adapted from: https://tobiasahlin.com/spinkit/
const Spinner = styled.div`
  padding: ${SPINNER_RADIUS}px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: ${SPINNER_RADIUS}px;
    height: ${SPINNER_RADIUS}px;
    border-radius: 100%;
    display: inline-block;
    animation: bouncedelay 1.4s infinite cubic-bezier(0.5, 0, 0.58, 1) both;
  }

  @keyframes bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

export const Loader = () => {
  return (
    <Spinner>
      <div
        style={{
          backgroundColor: "hsl(129, 47%, 40%)",
          animationDelay: "-0.32s",
        }}
      />
      <div
        style={{
          backgroundColor: "hsl(287, 30%, 49%)",
          animationDelay: "-0.16s",
          marginLeft: SPINNER_RADIUS / 6,
        }}
      />
      <div
        style={{
          backgroundColor: "hsl(4, 63%, 49%)",
          animationDelay: "0s",
          marginLeft: SPINNER_RADIUS / 6,
        }}
      />
    </Spinner>
  );
};
