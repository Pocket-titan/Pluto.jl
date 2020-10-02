import normalizeUrl from "normalize-url";
import { useEffect } from "react";
import ReconnectingWebSocket, { UrlProvider } from "reconnecting-websocket";
import create, { State, StateCreator, UseStore } from "zustand";
import produce from "immer";
import _ from "lodash";
import { encode_message, decode_message } from "./msgpack";
import { createVoid } from "typescript";
import { MimeType } from "../types";

const isPromise = (x: any): x is Promise<unknown> => {
  return x instanceof Promise;
};

const normalizeUrlProvider = (urlProvider: UrlProvider): UrlProvider => {
  switch (typeof urlProvider) {
    case "string": {
      return normalizeUrl(urlProvider);
    }
    case "function": {
      let result = urlProvider();

      if (typeof result === "string") {
        return normalizeUrl(result);
      }

      if (isPromise(result)) {
        return async () => {
          let url = await result;
          return normalizeUrl(url);
        };
      }
    }
    default: {
      throw new Error("Should never happen, really");
    }
  }
};

const createWebsocket = (
  urlProvider: UrlProvider,
  options: {
    maxReconnectionDelay?: number;
    minReconnectionDelay?: number;
    reconnectionDelayGrowFactor?: number;
    connectionTimeout?: number;
    maxRetries?: number;
    debug?: boolean;
  } = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1000,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 10000,
    maxRetries: Infinity,
    debug: false,
  }
) => {
  const normalizedUrlProvider = normalizeUrlProvider(urlProvider);

  return new ReconnectingWebSocket(normalizedUrlProvider, [], {
    ...options,
  });
};

const PORT = 1234;

const get_unique_short_id = (): Id => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
};

type Id = string;

// const useSocket = create<{
//   client_id: Id;
//   socket: ReconnectingWebSocket;
//   listeners: {
//     [K in UpdateType]?: Listener<K>[];
//   };
// }>((set, get) => {
//   let socket = createWebsocket(
//     async () => {
//       const { protocol, hostname } = document.location;
//       let url = `${protocol}//${hostname}:${PORT}/websocket_url_please`;
//       let secret = await (await fetch(url)).text();
//       return normalizeUrl(
//         `${protocol === "https:" ? "wss" : "ws"}://localhost:${PORT}/${secret}`
//       );
//     },
//     { debug: true }
//   );

//   socket.onmessage = async (event) => {
//     let buffer: ArrayBuffer = await event.data.arrayBuffer();
//     let update: Update = decode_message(buffer);
//     console.log("update", update.type, update);

//     let listeners = (get().listeners[update.type] || []) as Listener[];
//     listeners.forEach((listener) => {
//       listener(update);
//     });
//   };

//   return {
//     client_id: get_unique_short_id(),
//     socket: socket,
//     listeners: {},
//   };
// });

// const addListener = <T extends UpdateType>(
//   update_type: T,
//   listener: Listener<T>
// ): void => {
//   useSocket.setState(
//     produce(useSocket.getState(), ({ listeners }) => {
//       if (listeners[update_type] === undefined) {
//         listeners[update_type] = [];
//       }

//       (listeners[update_type] as Listener<T>[]).push(listener);
//     })
//   );
// };

// const removeListener = <T extends UpdateType>(
//   update_type: T,
//   listener: Listener<T>
// ): void => {
//   useSocket.setState(
//     produce(useSocket.getState(), ({ listeners }) => {
//       let index =
//         listeners[update_type] !== undefined
//           ? (listeners[update_type] as Listener<T>[]).indexOf(listener)
//           : -1;

//       if (index === -1) {
//         console.error("Couldn't find listener to remove :/");
//       } else {
//         listeners[update_type]!.splice(index, 1);
//       }
//     })
//   );
// };

type Path = string;

type MessageMap = {
  connect: Event;
  ping: Event;
  add_cell: Event;
  delete_cell: Event;
  move_multiple_cells: Event;
  change_cell: Event;
  fold_cell: Event;
  run: Event;
  run_multiple_cells: Event;
  get_input: Event;
  set_input: Event;
  get_output: Event;
  get_all_cells: {};
  get_all_notebooks: {};
  move_notebook_file: Event;
  interrupt_all: Event;
  shutdown_notebook: Event;
  set_bond: Event;
  completepath: {
    query: Path | "nothinginparticular";
  };
};

type MessageType = keyof MessageMap;

type Message<T extends MessageType = MessageType> = {
  type: T;
  request_id: Id;
  client_id: Id;
  body: MessageMap[T] | {};
  cell_id?: Id;
  notebook_id?: Id;
};

export type Notebook = {
  notebook_id: Id;
  path: Path;
  shortpath: Path;
  in_temp_dir: boolean;
};

// {
//   "shortpath": "Important blueprint.jl",
//   "path": "/tmp/Important blueprint.jl",
//   "in_temp_dir": true,
//   "notebook_id": "26625326-03d8-11eb-0366-8744ac0f1565"
// }

type Version = string;

type Ip = string;

export type Cell = {
  cell_id: Id;
  input?: CellInput;
  output?: CellOutput;
};

export type CellInput = {
  code: string;
  folded: boolean;
};

export type CellOutput = {
  queued: boolean;
  errored: boolean;
  output: {
    rootassignee: null;
    mime: MimeType;
    body: string;
  };
  runtime: number;
  running: boolean;
};

type UpdateMap = {
  notebook_list: {
    notebooks: Notebook[];
  };
  cell_output: CellOutput;
  cell_queued: Event;
  cell_running: Event;
  cell_folded: Event;
  cell_input: CellInput;
  cell_deleted: Event;
  cells_moved: Event;
  cell_added: Event;
  cell_list: {
    cells: Cell[];
  };
  bond_update: Event;
  //
  completion_result: Event;
  doc_result: Event;
  //
  "👋": {
    notebook_exists: boolean;
    version_info: {
      julia: Version;
      pluto: Version;
    };
    options: {
      server: {
        root_url: null;
        host: Ip;
        port: null;
        launch_browser: boolean;
        show_file_system: boolean;
        notebook_path_suggestion: Path;
      };
      security: {
        require_token_for_open_links: boolean;
      };
      evaluation: {
        run_notebook_on_load: boolean;
        workspace_use_distributed: boolean;
      };
      compiler: {
        compile: null;
        sysimage: null;
        banner: null;
        optimize: null;
        math_mode: null;
        project: "@.";
        startup_file: "no";
        history_file: "no";
        threads: null;
      };
    };
  };
  pong: Event;
};

type UpdateType = keyof UpdateMap;

type Update<T extends UpdateType = UpdateType> = {
  type: T;
  initiator_id: Id;
  request_id: Id;
  message: UpdateMap[T]; // TODO: call this 'body', just like in message. rn its ambiguous
  cell_id?: Id;
  notebook_id?: Id;
};

type Listener<T extends UpdateType = UpdateType> = (event: Update<T>) => void;

class Socket {
  private registry = new Map<UpdateType, Set<Listener>>();
  private client_id: string = get_unique_short_id();
  private socket: ReconnectingWebSocket;

  constructor() {
    let socket = createWebsocket(
      async () => {
        const { protocol, hostname } = document.location;
        let url = `${protocol}//${hostname}:${PORT}/websocket_url_please`;
        let secret = await (await fetch(url)).text();
        return normalizeUrl(
          `${
            protocol === "https:" ? "wss" : "ws"
          }://localhost:${PORT}/${secret}`
        );
      },
      { debug: true }
    );

    socket.onmessage = async (event) => {
      let buffer: ArrayBuffer = await event.data.arrayBuffer();
      let update: Update = decode_message(buffer);

      console.log("🎉 update", update.type, update);

      let listeners = this.registry.get(update.type);

      listeners?.forEach((listener) => {
        listener(update);
      });
    };

    this.socket = socket;
  }

  send<T extends MessageType>(message_type: T, rest: Partial<Message<T>> = {}) {
    let message: Message<T> = {
      type: message_type,
      request_id: get_unique_short_id(),
      client_id: this.client_id,
      body: {},
      ...rest,
    };

    console.log("🎉 message", message.type, message);

    let encoded_message = encode_message(message);

    this.socket.send(encoded_message);
  }

  emit<T extends UpdateType>(update_type: T, ...rest: Parameters<Listener<T>>) {
    const listeners = this.registry.get(update_type);

    if (!listeners) {
      return false;
    }

    listeners.forEach((listener) => {
      listener(...rest);
    });

    return true;
  }

  on<T extends UpdateType>(update_type: T, listener: Listener<T>) {
    let listeners = this.registry.get(update_type);

    if (!listeners) {
      this.registry.set(update_type, (listeners = new Set()));
    }

    (listeners as Set<Listener<T>>).add(listener);
  }

  off<T extends UpdateType>(update_type: T, listener: Listener<T>) {
    let listeners: Set<Listener<T>> | undefined = this.registry.get(
      update_type
    );

    if (!listeners || !listeners.has(listener)) {
      return;
    }

    if (listeners.size === 1) {
      this.registry.delete(update_type);
    } else {
      listeners.delete(listener);
    }
  }

  once<T extends UpdateType>(update_type: T, listener: Listener<T>) {
    let f = (...args: Parameters<Listener<T>>): void => {
      listener(...args);
      this.off(update_type, f);
    };

    this.on(update_type, f);
  }
}

export const useSocket = create<{
  socket: Socket;
}>((get, set) => ({
  socket: new Socket(),
}));

export const useListener = <T extends UpdateType>(
  update_type: T,
  listener: Listener<T>,
  dependencies?: React.DependencyList
): void => {
  const socket = useSocket.getState().socket;

  useEffect(() => {
    socket.on(update_type, listener);

    return () => {
      socket.off(update_type, listener);
    };
  }, dependencies);
};

type ValueOf<T> = T[keyof T];

export const send = async <T extends MessageType>(
  message_type: T,
  rest: Partial<Message<T>> = {}
) => {
  const socket = useSocket.getState().socket;

  socket.send(message_type, rest);

  let response = responseMap[message_type as keyof typeof responseMap];
  return new Promise((resolve, reject) => {
    if (response) {
      socket.once(response!, resolve as any);
    } else {
      resolve();
    }
  }) as Promise<T extends keyof ResponseMap ? Update<ResponseMap[T]> : void>;
};

const responseMap = {
  connect: "👋",
  get_all_notebooks: "notebook_list",
  get_all_cells: "cell_list",
} as const;

type ResponseMap = typeof responseMap;
