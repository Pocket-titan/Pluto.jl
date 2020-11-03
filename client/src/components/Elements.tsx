import { useEffect, useCallback } from "react";

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
