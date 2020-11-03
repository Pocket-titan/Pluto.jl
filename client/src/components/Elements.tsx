import React, { useEffect, useCallback } from "react";

export const DocumentEvent = <K extends keyof DocumentEventMap>({
  handler,
  name,
  capture = false,
  passive = undefined,
  targets = undefined,
}: {
  handler: (event: DocumentEventMap[K]) => void;
  name: K;
  passive?: boolean;
  capture?: boolean;
  targets?: (tags: string[]) => boolean;
}) => {
  let fn = useCallback(
    (event: DocumentEventMap[K]) => {
      if (targets) {
        let tagNames: string[] = (event.composedPath() as any).map(
          (target: any) => target.tagName
        );
        if (!targets(tagNames)) {
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
