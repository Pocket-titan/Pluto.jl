import type { Patch } from "immer";

/** Mime type stuff */
const commonMimes = [
  "audio/aac",
  "application/x-abiword",
  "application/x-freearc",
  "video/x-msvideo",
  "application/vnd.amazon.ebook",
  "application/octet-stream",
  "image/bmp",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-csh",
  "text/css",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-fontobject",
  "application/epub+zip",
  "application/gzip",
  "image/gif",
  "text/html",
  "image/vnd.microsoft.icon",
  "text/calendar",
  "application/java-archive",
  "image/jpeg",
  "text/javascript",
  "application/json",
  "application/ld+json",
  "audio/midi audio/x-midi",
  "text/javascript",
  "audio/mpeg",
  "video/mpeg",
  "application/vnd.apple.installer+xml",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "audio/ogg",
  "video/ogg",
  "application/ogg",
  "audio/opus",
  "font/otf",
  "image/png",
  "application/pdf",
  "application/x-httpd-php",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.rar",
  "application/rtf",
  "application/x-sh",
  "image/svg+xml",
  "application/x-shockwave-flash",
  "application/x-tar",
  "image/tiff",
  "video/mp2t",
  "font/ttf",
  "text/plain",
  "application/vnd.visio",
  "audio/wav",
  "audio/webm",
  "video/webm",
  "image/webp",
  "font/woff",
  "font/woff2",
  "application/xhtml+xml",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/xml",
  "application/vnd.mozilla.xul+xml",
  "application/zip",
  "video/3gpp\naudio/3gpp if it doesn't contain video",
  "video/3gpp2\naudio/3gpp2 if it doesn't contain video",
  "application/x-7z-compressed",
] as const;

const plutoMimes = [
  "application/vnd.pluto.tree+object",
  "application/vnd.pluto.table+object",
  "application/vnd.pluto.stacktrace+object",
] as const;

const mimes = [...commonMimes, ...plutoMimes] as const;

type Mime = typeof mimes[number];

/** Below is how Pluto represents notebook/cell data */
type CellInputData = {
  cell_id: string;
  code: string;
  code_folded: boolean;
};

type CellResultData = {
  cell_id: string;
  queued: boolean;
  running: boolean;
  errored: boolean;
  runtime?: number;
  output?: {
    body: any;
    persist_js_state: boolean;
    last_run_timestamp: number;
    mime: Mime;
    rootassignee?: string;
  };
};

type NotebookData = {
  bonds: { [name: string]: any };
  cell_inputs: { [uuid: string]: CellInputData };
  cell_order: string[];
  cell_results: { [uuid: string]: CellResultData };
  in_temp_dir: boolean;
  // notebook_id: string;
  path: string;
  shortpath: string;
};

/** And this is how we represent a cell here */
type Cell = CellResultData & {
  cell_id: string;
  input: CellInputData;
};

type Messages = {
  complete: {
    notebook_id: string;
    body: {
      query: string;
    };
  };
  completepath: {
    body: {
      query: string;
    };
  };
  connect: {
    notebook_id?: string;
  };
  docs: {
    notebook_id: string;
    body: {
      query: string;
    };
  };
  get_all_notebooks: {};
  interrupt_all: {
    notebook_id: string;
    body: {};
  };
  ping: {};
  reshow_cell: {
    notebook_id: string;
    body: {
      objectid: string;
      dim: string;
      cell_id: string;
    };
  };
  run_multiple_cells: {
    notebook_id: string;
    body: {
      cells: string[];
    };
  };
  shutdown_notebook: {
    notebook_id: string;
    body: {
      keep_in_session: boolean;
    };
  };
  update_notebook: {
    notebook_id: string;
    body: {
      updates: Patch[];
    };
  };
  write_file: {
    notebook_id: string;
    cell_id: string;
    body: {
      file: string;
      name: string;
      type: string;
      path: string;
    };
  };
  // EXPERIMENTAL
  friends: {
    notebook_id: string;
    body: FriendStatus;
  };
  trigger: {
    notebook_id: string;
    body: {
      source: string;
      handlerId: string;
      payload: any;
    };
  };
};

type MessageType = keyof Messages;

type Message<T extends MessageType = MessageType> = {
  [K in MessageType]: {
    request_id: string;
    client_id: string;
    type: K;
    body: {};
  } & Messages[K];
}[T];

type Updates = {
  "👋": {
    body: {
      notebook_exists: boolean;
      options: { [key: string]: any };
      version_info: { pluto: string; julia: string };
    };
  };
  completion_result: {
    body: {
      start: number;
      stop: number;
      results: any[];
    };
  };
  doc_result: {
    body: {
      status: string;
      doc: string; // html?
    };
  };
  log: any;
  notebook_diff: {
    body: {
      patches: Patch[];
      response?: {
        update_went_well: "👍" | "👎";
        should_i_tell_the_user?: boolean;
        why_not?: string;
      };
    };
  };
  notebook_list: {
    body: {
      notebooks: {
        notebook_id: string;
        path: string;
        in_temp_dir: boolean;
        shortpath: string;
      }[];
    };
  };
  pong: {
    body: {};
  };
  write_file_reply: {
    body: {
      success: boolean;
      code: string | any;
    };
  };
  // EXPERIMENTAL
  friends: {
    body: {
      friends: {
        [id: string]: Friend;
      };
    };
  };
  trigger: {
    body: {
      source: string;
      handlerId: string;
      payload: any;
    };
  };
};

type UpdateType = keyof Updates;

type Update<T extends UpdateType = UpdateType> = {
  [K in UpdateType]: {
    request_id: string;
    initiator_id?: string;
    client_id: string;
    type: K;
    body: {};
  } & Updates[K];
}[T];

const responseMap = {
  complete: "completion_result",
  completepath: "completion_result",
  connect: "👋",
  docs: "doc_result",
  get_all_notebooks: "notebook_list",
  ping: "pong",
  write_file: "write_file_reply",
  // Idk if this should be a req/resp pair yet
  update_notebook: "notebook_diff",
  friends: "friends",
} as const;

type ResponseMap = typeof responseMap;

type Listener<T extends UpdateType = UpdateType> = (update: Update<T>) => void;

type RecentNotebook = {
  /** `notebook_id = null` means that it is not running */
  notebook_id: string | null;
  transitioning: boolean;
  path: string;
};

type FriendStatus =
  | {
      type: "joined";
    }
  | {
      type: "idle";
    }
  | {
      type: "selecting_cells";
      cell_ids: string[];
    }
  | {
      type: "cursor";
      cell_id: string;
      offset: number;
      selection?: {
        startOffset: number;
        endOffset: number;
      };
      changes?: {
        value: string;
        range: {
          startOffset: number;
          endOffset: number;
        };
      };
    }
  | {
      type: "left";
    };

type Friend = {
  id: string;
  animal: string;
  color: string;
  status: FriendStatus;
};

/**
 * And now for all the interfaces we're extending to keep ts happy
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pluto-notebook": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "pluto-cell": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "pluto-input": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "pluto-output": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

declare global {
  interface Window {
    __theme: "dark" | "light";
    __setPreferredTheme: (theme: "dark" | "light") => void;
    __onThemeChange: (newTheme: "dark" | "light") => void;
  }
}

declare module "styled-components" {
  export interface DefaultTheme {
    isDark: boolean;
  }
}

export { commonMimes, plutoMimes, mimes };

export type {
  Cell,
  CellInputData,
  CellResultData,
  Friend,
  FriendStatus,
  Listener,
  Message,
  MessageType,
  Messages,
  Mime,
  NotebookData,
  RecentNotebook,
  ResponseMap,
  Update,
  UpdateType,
  Updates,
};

const keys = [
  "alt",
  "backspace",
  "capslock",
  "ctrl",
  "del",
  "down",
  "end",
  "enter",
  "esc",
  "home",
  "ins",
  "left",
  "meta",
  "mod",
  "pagedown",
  "pageup",
  "right",
  "shift",
  "space",
  "tab",
  "up",
  "a",
  "b",
  "c",
  "d",
  "e",
] as const;

type Key = typeof keys[number];

type Combo = `${Key}+${Key}` | `${Key}+${Key}+${Key}`;
