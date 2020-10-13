import React, { useCallback, useEffect } from "react";
import { Id, RecentNotebook } from "./types";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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

export const getRecentNotebooks = (): RecentNotebook[] => {
  const storedString = localStorage.getItem("recent notebooks");
  const paths: string[] = !!storedString ? JSON.parse(storedString) : [];

  if (!(paths instanceof Array)) {
    return [];
  }

  return paths.map((path: string) => ({
    transitioning: false,
    notebook_id: null,
    path,
  }));
};

export const updateRecentNotebooks = (newPath: string, toDelete?: string) => {
  const storedString = localStorage.getItem("recent notebooks");
  const paths: string[] = !!storedString ? JSON.parse(storedString) : [];

  let newPaths = [newPath].concat(
    paths.filter((path) => path !== newPath && path !== toDelete)
  );

  localStorage.setItem(
    "recent notebooks",
    JSON.stringify(newPaths.slice(0, 50))
  );
};

export const getNotebookId = (): Id => {
  let notebook_id = new URLSearchParams(window.location.search).get("id");

  if (!notebook_id) {
    console.error("Failed to get notebook id");
    return "";
  }

  return notebook_id;
};
