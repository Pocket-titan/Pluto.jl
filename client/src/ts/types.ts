type Cell = {
  cell_id: string;
  output: Output;
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
  get_output: {
    notebook_id: string;
    cell_id: string;
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
    body: {};
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
    body: {
      queued: boolean;
      errored: boolean;
      running: boolean;
      runtime: number;
      input: Input;
    };
  };
  cell_output: {
    notebook_id: string;
    cell_id: string;
    body: Output;
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
} as const;

type ResponseMap = typeof responseMap;

/** Recent/stored notebook */
type RecentNotebook = {
  notebook_id: string;
  transitioning: boolean;
  path: string;
};

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
