import type { ComponentClass, FunctionComponent } from "react";
import type { Mime } from "ts/types";
import HTML from "./HTML";
import Plain from "./Plain";
import PlutoStacktrace from "./PlutoStacktrace";
import PlutoTable from "./PlutoTable";
import PlutoTree from "./PlutoTree";
import SVG from "./SVG";

type Props = {
  body: any;
  mime: Mime;
};

const outputMap: {
  [K in Mime]?: FunctionComponent<Props> | ComponentClass<Props>;
} = {
  "text/html": HTML,
  "text/plain": Plain,
  "image/svg+xml": SVG,
  "application/vnd.pluto.tree+object": PlutoTree,
  "application/vnd.pluto.table+object": PlutoTable,
  "application/vnd.pluto.stacktrace+object": PlutoStacktrace,
};

export { outputMap };
