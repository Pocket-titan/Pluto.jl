import type { RecentNotebook } from "./types";
import { v4 as uuidv4 } from "uuid";

/** Generate a "unique" short id */
export const getUniqueShortId = () => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
};

export const getQueryParam = (key: string) => {
  return new URLSearchParams(window.location.search).get(key);
};

export const getNotebookId = () => getQueryParam("id")!;

export const uuid = uuidv4;

/** Get the recent notebook sessions, saved by `updateRecentNotebooks` */
export const getRecentNotebooks = (): RecentNotebook[] => {
  const storedString = localStorage.getItem("recent notebooks");
  const paths: string[] = !!storedString ? JSON.parse(storedString) : [];

  if (!(paths instanceof Array)) {
    return [];
  }

  return paths.map((path) => ({
    transitioning: false,
    notebook_id: null,
    path,
  }));
};

/** Update the recent notebook sessions saved in `localStorage` */
export const updateRecentNotebooks = (newPath: string, toDelete?: string) => {
  const storedString = localStorage.getItem("recent notebooks");
  const paths: string[] = !!storedString ? JSON.parse(storedString) : [];

  let newPaths = [newPath].concat(
    paths.filter((path) => path !== newPath && path !== toDelete)
  );

  try {
    localStorage.setItem(
      "recent notebooks",
      JSON.stringify(newPaths.slice(0, 50))
    );
  } catch (e) {
    console.error(e);
  }
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const navigate = async (route: string) => {
  const { origin, port } = window.location;

  const url =
    (process.env.NODE_ENV === "development"
      ? `${origin.replace(port, "1234")}`
      : origin) + `${!route.startsWith("/") ? "/" : ""}${route}`;

  let res = await fetch(url, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  let resUrl = new URL(res.url);
  let redirectUrl = new URL(`${origin}${resUrl.pathname}${resUrl.search}`);

  return redirectUrl;
};
