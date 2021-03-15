import { useEffect } from "react";
import ReconnectingWebsocket, {
  UrlProvider,
  Options,
} from "reconnecting-websocket";
import normalizeUrl from "normalize-url";
import create from "zustand";
import _ from "lodash";
import { decodeMessage, encodeMessage } from "./msgpack";
import { getUniqueShortId } from "./utils";
import type {
  Listener,
  Message,
  MessageType,
  ResponseMap,
  Update,
  UpdateType,
} from "./types";

const createWebsocket = (
  urlProvider: UrlProvider,
  options: Options = {}
): ReconnectingWebsocket => {
  return new ReconnectingWebsocket(
    async () => {
      let url =
        typeof urlProvider === "string" ? urlProvider : await urlProvider();
      return normalizeUrl(url);
    },
    [],
    {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 10000,
      maxRetries: Infinity,
      debug: false,
      ...options,
    }
  );
};

class Socket {
  private client_id: string = getUniqueShortId();
  private listeners = new Map<string, Set<Listener>>();
  private requests = new Map<string, Listener>();
  private socket: ReconnectingWebsocket;
  private task = Promise.resolve();

  constructor({ port = 1234, ...options }: { port?: number } & Options = {}) {
    const socket = createWebsocket(() => {
      let { protocol, hostname } = window.location;
      let isNgrok = hostname.includes("ngrok.io");
      return `${protocol === "https:" ? "wss" : "ws"}://${hostname}${
        isNgrok ? "/" : `:${port}/`
      }`;
    }, options);

    socket.onmessage = async (event) =>
      void (this.task = this.task.then(async () => {
        let buffer: ArrayBuffer = await event.data.arrayBuffer();
        let update = decodeMessage(buffer);

        // @WARN
        // Updates have their content under the key 'message'
        // but I think that's confusing so I put it under 'body'
        const bodyUpdate = _.omit(update, "message");
        bodyUpdate.body = update.message;
        update = { ...bodyUpdate };

        console.debug("🦖 Received update", update);

        if (update.type === "friends") {
          // Ignore ourselves
          delete update.body.friends[this.client_id];

          // Ignore the whole update if it contains no info about others
          if (Object.keys(update.body.friends).length === 0) {
            return;
          }
        }

        let initiatedByMe = update?.initiator_id === this.client_id;

        if (initiatedByMe && this.requests.has(update?.request_id)) {
          let request = this.requests.get(update.request_id)!;
          request(update);
          this.requests.delete(update.request_id);
        } else {
          this.listeners.get(update.type)?.forEach((listener) => {
            listener(update);
          });
        }
      }));

    this.socket = socket;
  }

  /** Requests _do_ receive a response (that you can `await`) */
  async sendRequest<T extends MessageType & keyof ResponseMap>(
    type: T,
    rest: Partial<Omit<Message<T>, "request_id" | "client_id" | "type">>
  ): Promise<Update<ResponseMap[T]>> {
    let message = {
      request_id: getUniqueShortId(),
      client_id: this.client_id,
      type,
      body: {},
      ...rest,
    };

    console.debug("🦖 Sending request", message);

    let encodedMessage = encodeMessage(message);
    this.socket.send(encodedMessage);

    return new Promise((resolve) => {
      this.requests.set(message.request_id, resolve as Listener);
    });
  }

  /** Notifications _don't_ receive a response */
  async sendNotification<T extends MessageType>(
    type: T,
    rest: Partial<Omit<Message<T>, "request_id" | "client_id" | "type">>
  ) {
    let message = {
      request_id: getUniqueShortId(),
      client_id: this.client_id,
      type,
      body: {},
      ...rest,
    };

    console.debug("🦖 Sending notification", message);

    let encodedMessage = encodeMessage(message);
    this.socket.send(encodedMessage);
  }

  /** Listen for updates of type: ${type} */
  on<T extends UpdateType>(type: T, listener: Listener<T>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    this.listeners.get(type)!.add(listener as Listener);
  }

  /** Stop listening for updates of type: ${type} */
  off<T extends UpdateType>(type: T, listener: Listener<T>) {
    let listeners = this.listeners.get(type);
    if (!listeners?.has(listener as Listener)) {
      return;
    }

    if (listeners.size === 1) {
      this.listeners.delete(type);
    } else {
      listeners.delete(listener as Listener);
    }
  }
}

/** Just for storing the socket - you shouldn't need to access this yourself */
export const useSocket = create<{ socket: Socket }>((set, get) => ({
  socket: new Socket({ maxRetries: 0 }),
}));

/** Send a message; does receive a response */
export const sendRequest = async <T extends MessageType & keyof ResponseMap>(
  type: T,
  rest: Partial<Omit<Message<T>, "request_id" | "client_id" | "type">> = {}
) => {
  const socket = useSocket.getState().socket;
  return socket.sendRequest(type, rest);
};

/** Send a notification; does not receive a response */
export const sendNotification = async <T extends MessageType>(
  type: T,
  rest: Partial<Omit<Message<T>, "request_id" | "client_id" | "type">> = {}
) => {
  const socket = useSocket.getState().socket;
  return socket.sendNotification(type, rest);
};

/** Listen to _notifications_ (requests bypass this!) from the server */
export const useListener = <T extends UpdateType>(
  type: T,
  listener: Listener<T>,
  dependencies?: React.DependencyList
) => {
  const socket = useSocket((state) => state.socket);

  useEffect(() => {
    socket.on(type, listener);

    return () => {
      socket.off(type, listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies ?? []);
};
