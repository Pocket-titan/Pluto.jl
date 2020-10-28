import { useLocation } from "react-router-dom";
import _ from "lodash";

/** Convenient hook for accessing queryParams (NOTE: i think `useLocation` vs `window.location` matters?) */
export function useQueryParams(key: string[]): (string | null)[];
export function useQueryParams(key: string): string | null;
export function useQueryParams(key: string | string[]) {
  let queryParams = new URLSearchParams(useLocation().search);

  if (_.isArray<string>(key)) {
    return key.map((k) => queryParams.get(k));
  }

  return queryParams.get(key);
}
