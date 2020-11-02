import _ from "lodash";
import type { RecentNotebook } from "./types";

/** Generate a "unique" short id */
export function getUniqueShortId() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}

/** Get the recent notebook sessions, saved by `updateRecentNotebooks` */
export function getRecentNotebooks(): RecentNotebook[] {
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
}

/** Update the recent notebook sessions saved in `localStorage` */
export function updateRecentNotebooks(newPath: string, toDelete?: string) {
  const storedString = localStorage.getItem("recent notebooks");
  const paths: string[] = !!storedString ? JSON.parse(storedString) : [];

  let newPaths = [newPath].concat(
    paths.filter((path) => path !== newPath && path !== toDelete)
  );

  localStorage.setItem(
    "recent notebooks",
    JSON.stringify(newPaths.slice(0, 50))
  );
}

/** Navigate to a specific subroute (TODO: do this more cleanly) */
export async function navigate(route: string) {
  try {
    const { protocol, hostname } = window.location;
    let url = `${protocol}//${hostname}:${1234}${route}`;
    let res = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    let res_url = new URL(res.url);

    let redirect_url =
      process.env.NODE_ENV === "development"
        ? res_url.href.replace("1234", "3000")
        : res_url.href;
    window.location.href = redirect_url;
  } catch {}
}

/** Get one or more queryParams from the url, if they exist */
export function getQueryParams(key: string): string | null;
export function getQueryParams(key: string[]): (string | null)[];
export function getQueryParams(key: string | string[]) {
  let queryParams = new URLSearchParams(window.location.search);

  if (_.isArray<string>(key)) {
    return key.map((k) => queryParams.get(k));
  }

  return queryParams.get(key);
}

/** Reorder an array */
export function reorder<T extends unknown>(
  list: T[],
  startIndex: number,
  endIndex: number
) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
