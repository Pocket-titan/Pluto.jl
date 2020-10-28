import React, { useEffect, useCallback } from "react";

export const DocumentEvent = <K extends keyof DocumentEventMap>({
  handler,
  name,
  passive = false,
  capture = false,
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

      if (!passive) {
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
  }, [fn, name, capture]);

  return null;
};
