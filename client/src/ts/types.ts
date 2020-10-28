type Cell = {
  cell_id: string;
  output?: Output;
  input: Input;
  queued: boolean;
  running: boolean;
  errored: boolean;
  runtime: number;
};

type Input = {
  code: string;
  folded: boolean;
};

type Output = {
  body: string;
  mime: string;
  rootassignee: null;
  last_run_timestamp: number;
};

type Notebook = {
  notebook_id: string;
  in_temp_dir: boolean;
  path: string;
  shortpath: string;
};

/** What we send */
type Messages = {
  connect: {
    notebook_id?: string;
  };
  get_all_notebooks: {};
  get_all_cells: {
    notebook_id: string;
  };
  get_input: {
    notebook_id: string;
    cell_id: string;
  };
  set_input: {
    notebook_id: string;
    cell_id: string;
    body: {
      code: string;
    };
  };
  get_output: {
    notebook_id: string;
    cell_id: string;
  };
  shutdown_notebook: {
    notebook_id: string;
    body: {
      keep_in_session: boolean;
    };
  };
  add_cell: {
    notebook_id: string;
    cell_id: string;
    body: {
      index: number;
    };
  };
  delete_cell: {
    notebook_id: string;
    cell_id: string;
  };
  fold_cell: {
    notebook_id: string;
    cell_id: string;
    body: {
      folded: boolean;
    };
  };
  change_cell: {
    notebook_id: string;
    cell_id: string;
    body: {
      code: string;
    };
  };
  run_multiple_cells: {
    notebook_id: string;
    body: {
      cells: Cell["cell_id"][];
    };
  };
  move_multiple_cells: {
    notebook_id: string;
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
    notebook_id: string;
    body: {
      query: string;
    };
  };
  complete: {
    notebook_id: string;
    body: {
      query: string;
    };
  };
};

type MessageType = keyof Messages;

type Message<T extends MessageType = MessageType> = {
  [K in MessageType]: {
    type: K;
    client_id: string;
    request_id: string;
    body: {};
  } & Messages[K];
}[T];

/** What we receive */
type Updates = {
  "👋": {
    body: {
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
    body: {
      notebooks: Notebook[];
    };
  };
  cell_list: {
    body: {
      cells: Pick<Cell, "cell_id">[];
    };
  };
  cell_input: {
    notebook_id: string;
    cell_id: string;
    body: Input;
  };
  cell_output: {
    notebook_id: string;
    cell_id: string;
    body: {
      queued: boolean;
      errored: boolean;
      running: boolean;
      runtime: number;
      output: Output;
    };
  };
  cell_queued: {
    notebook_id: string;
    cell_id: string;
  };
  cell_added: {
    notebook_id: string;
    cell_id: string;
    body: {
      index: number;
    };
  };
  cell_deleted: {
    notebook_id: string;
    cell_id: string;
  };
  cell_folded: {
    notebook_id: string;
    cell_id: string;
    body: {
      folded: boolean;
    };
  };
  cells_moved: {
    notebook_id: string;
    body: {
      cells: Cell["cell_id"][];
      index: number;
    };
  };
  doc_result: {
    notebook_id: string;
    body: {
      status: "⌛" | "👍";
      doc: string;
    };
  };
  completion_result: {
    notebook_id: string;
    body: {
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
    initiator_id?: string;
    request_id?: string;
    body: {};
  } & Updates[K];
}[T];

/** Generic listener type */
type Listener<T extends UpdateType = UpdateType> = (update: Update<T>) => void;

/** Map between Messages and the particular Update they receive as a response */
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
  fold_cell: "cell_folded",
} as const;

type ResponseMap = typeof responseMap;

/** Recent/stored notebook */
type RecentNotebook = {
  notebook_id: string | null; // null means that it is not running
  transitioning: boolean;
  path: string;
};

/** All the interfaces we're extending to keep ts happy */
declare global {
  interface Window {
    __monaco_is_loaded: boolean;
    __on_monaco_loaded: Function;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pluto-cell": React.DetailedHTMLProps<
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

export type {
  Cell,
  Input,
  Output,
  Notebook,
  RecentNotebook,
  Messages,
  Message,
  MessageType,
  Updates,
  Update,
  UpdateType,
  Listener,
  ResponseMap,
};
