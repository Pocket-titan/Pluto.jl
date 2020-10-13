const mimeTypes = [
  "application/json",
  "application/pdf",
  "application/rtf",
  "application/vnd.ms-excel",
  "application/msword",
  "audio/wav",
  "audio/webm",
  "audio/mpeg",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
  "text/plain",
  "text/markdown",
  "text/html",
  "text/csv",
  "text/calendar",
  "video/webm",
  "video/x-msvideo",
  "video/mpeg",
  // Special pluto mimes
  "application/vnd.pluto.tree+xml",
  "application/vnd.pluto.stacktrace+json",
] as const;

type MimeType = typeof mimeTypes[number];

type Id = string;

type Notebook = {
  notebook_id: Id;
  in_temp_dir: boolean;
  path: string;
  shortpath: string;
};

type Cell = {
  cell_id: Id;
  output?: CellOutput;
  input?: CellInput;
  queued?: boolean;
  running?: boolean;
  errored?: boolean;
  runtime?: number;
  //
  selected?: boolean;
};

type CellInput = {
  folded: boolean;
  code: string;
};

type CellOutput = {
  rootassignee?: null;
  body: string;
  mime?: MimeType;
};

type Messages = {
  connect: {
    notebook_id?: Id;
  };
  get_all_notebooks: {};
  get_all_cells: {
    notebook_id: Id;
  };
  add_cell: {
    notebook_id: Id;
    cell_id: Id;
    body: {
      index: number;
    };
  };
  delete_cell: {
    notebook_id: Id;
    cell_id: Id;
  };
  get_input: {
    notebook_id: Id;
    cell_id: Id;
  };
  set_input: {
    notebook_id: Id;
    cell_id: Id;
    body: {
      code: string;
    };
  };
  get_output: {
    notebook_id: Id;
    cell_id: Id;
  };
  fold_cell: {
    notebook_id: Id;
    cell_id: Id;
    body: {
      folded: boolean;
    };
  };
  change_cell: {
    notebook_id: Id;
    cell_id: Id;
    body: {
      code: string;
    };
  };
  run_multiple_cells: {
    notebook_id: Id;
    body: {
      cells: Cell["cell_id"][];
    };
  };
  move_multiple_cells: {
    notebook_id: Id;
    body: {
      cells: Cell["cell_id"][];
      index: number;
    };
  };
  completepath: {
    body: {
      query: string | "nothinginparticular";
    };
  };
  docs: {
    notebook_id: Id;
    body: {
      query: string;
    };
  };
  complete: {
    notebook_id: Id;
    body: {
      query: string;
    };
  };
  shutdown_notebook: {
    notebook_id: Id;
    body: {
      keep_in_session: boolean;
    };
  };
};

type MessageType = keyof Messages;

type Message<T extends MessageType = MessageType> = {
  [K in MessageType]: {
    type: K;
    client_id: Id;
    request_id: Id;
    body: {};
  } & Messages[K];
}[T];

type Updates = {
  "👋": {
    message: {
      notebook_exists: boolean;
      options: {
        [key: string]: any;
      };
      version_info: {
        julia: string;
        pluto: string;
      };
    };
  };
  notebook_list: {
    message: {
      notebooks: Notebook[];
    };
  };
  cell_list: {
    message: {
      cells: Cell[];
    };
  };
  cell_input: {
    notebook_id: Id;
    cell_id: Id;
    message: CellInput;
  };
  cell_output: {
    notebook_id: Id;
    cell_id: Id;
    message: {
      queued: boolean;
      errored: boolean;
      running: boolean;
      runtime: number;
      output: CellOutput;
    };
  };
  cell_queued: {
    notebook_id: Id;
    cell_id: Id;
  };
  cell_added: {
    notebook_id: Id;
    cell_id: Id;
    message: {
      index: number;
    };
  };
  cell_deleted: {
    notebook_id: Id;
    cell_id: Id;
  };
  cell_folded: {
    notebook_id: Id;
    cell_id: Id;
    message: {
      folded: boolean;
    };
  };
  cells_moved: {
    notebook_id: Id;
    message: {
      cells: Cell["cell_id"][];
      index: number;
    };
  };
  doc_result: {
    notebook_id: Id;
    message: {
      status: "⌛" | "👍";
      doc: string;
    };
  };
  completion_result: {
    notebook_id: Id;
    message: {
      start: number;
      stop: number;
      results: string[];
    };
  };
};

type UpdateType = keyof Updates;

type Update<T extends UpdateType = UpdateType> = {
  [K in UpdateType]: {
    type: K;
    initiator_id?: Id;
    request_id?: Id;
    message: {};
  } & Updates[K];
}[T];

const responseMap = {
  connect: "👋",
  get_all_notebooks: "notebook_list",
  get_all_cells: "cell_list",
  get_input: "cell_input",
  get_output: "cell_output",
  docs: "doc_result",
  complete: "completion_result",
  add_cell: "cell_added",
  delete_cell: "cell_deleted",
} as const;

type ResponseMap = typeof responseMap &
  {
    [K in Exclude<MessageType, keyof typeof responseMap>]: null;
  };

type RecentNotebook = {
  transitioning: boolean; // between running and being shut down
  notebook_id: string | null; // null means that it is not running
  path: string;
};

export type {
  Id,
  MimeType,
  Cell,
  CellInput,
  CellOutput,
  Notebook,
  Message,
  MessageType,
  Update,
  UpdateType,
  ResponseMap,
  RecentNotebook,
};

export { responseMap };
