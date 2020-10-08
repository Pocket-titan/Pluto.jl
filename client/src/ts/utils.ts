import React, { useCallback, useEffect } from "react";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const DocumentEvent = <K extends keyof DocumentEventMap>({
  handler,
  name,
  passive = false,
  capture = false,
}: {
  handler: (event: DocumentEventMap[K]) => void;
  name: K;
  passive?: boolean;
  capture?: boolean;
}) => {
  let fn = useCallback(
    (event: DocumentEventMap[K]) => {
      if (!passive) {
        event.preventDefault();
      }

      handler(event);
    },
    [passive, handler]
  );

  useEffect(() => {
    document.addEventListener(name, fn, { capture });

    return () => {
      document.removeEventListener(name, fn, { capture });
    };
  }, [fn, name, capture]);

  return null;
};
