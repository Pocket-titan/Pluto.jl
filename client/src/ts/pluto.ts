import React, { useEffect } from "react";
import ReconnectingWebSocket, { UrlProvider } from "reconnecting-websocket";
import { encode_message, decode_message } from "./msgpack";
import normalizeUrl from "normalize-url";
import create from "zustand";
import {
  Id,
  Message,
  MessageType,
  Update,
  UpdateType,
  ResponseMap,
  responseMap,
} from "./types";

const PORT = 1234;

const get_unique_short_id = (): Id => {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
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

      if (result instanceof Promise) {
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

export const createWebsocket = (
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

type Listener<T extends UpdateType = UpdateType> = (update: Update<T>) => void;

class Socket {
  private listeners = new Map<UpdateType, Set<Listener>>();
  private requests = new Map<
    Id,
    {
      resolve: Listener;
      suppress: boolean;
    }
  >();
  public client_id = get_unique_short_id();
  public socket: ReconnectingWebSocket;

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
      { debug: false }
    );

    socket.onmessage = async (event) => {
      let buffer: ArrayBuffer = await event.data.arrayBuffer();
      let update: Update = decode_message(buffer);

      console.log("🎉 Update", update.type, update);

      // i can't believe i've done this
      let it_was_me = update?.initiator_id === this.client_id;

      if (update.request_id && it_was_me) {
        let request = this.requests.get(update.request_id);
        if (request) {
          request.resolve(update);
          this.requests.delete(update.request_id);

          if (request.suppress) {
            return;
          }
        }
      }

      this.listeners.get(update.type)?.forEach((listener) => {
        listener(update);
      });
    };

    this.socket = socket;
  }

  async send<T extends MessageType>(
    message_type: T,
    rest: Partial<
      Exclude<Message<T>, "type" | "request_id" | "client_id">
    > = {},
    // If there is a request waiting, the update won't trigger other listeners if true.
    suppress: boolean = false
  ) {
    let message = {
      type: message_type,
      request_id: get_unique_short_id(),
      client_id: this.client_id,
      body: {},
      ...rest,
    };

    console.log("🎉 Message", message.type, message);

    let encoded_message = encode_message(message);
    this.socket.send(encoded_message);

    let response = (responseMap as ResponseMap)[message_type];
    return new Promise((resolve) => {
      if (response) {
        this.requests.set(message.request_id, {
          resolve: resolve as any,
          suppress,
        });
      } else {
        resolve();
      }
    }) as Promise<
      T extends keyof typeof responseMap ? Update<ResponseMap[T]> : void
    >;
  }

  on<T extends UpdateType>(update_type: T, listener: Listener<T>) {
    if (!this.listeners.has(update_type)) {
      this.listeners.set(update_type, new Set());
    }

    this.listeners.get(update_type)!.add(listener as Listener);
  }

  off<T extends UpdateType>(update_type: T, listener: Listener<T>) {
    let listeners = this.listeners.get(update_type) as Set<Listener<T>>;
    if (!listeners?.has(listener)) {
      return;
    }

    if (listeners.size === 1) {
      this.listeners.delete(update_type);
    } else {
      listeners.delete(listener);
    }
  }
}

const useSocket = create<{
  socket: Socket;
}>((set, get) => ({
  socket: new Socket(),
}));

const send = async <T extends MessageType>(
  message_type: T,
  message: Partial<
    Exclude<Message<T>, "type" | "request_id" | "client_id">
  > = {},
  suppress: boolean = false
): Promise<
  T extends keyof typeof responseMap ? Update<ResponseMap[T]> : void
> => {
  const socket = useSocket.getState().socket;
  return socket.send(message_type, message, suppress);
};

const useListener = <T extends UpdateType>(
  update_type: T,
  listener: Listener<T>,
  dependencies?: React.DependencyList
) => {
  const socket = useSocket((state) => state.socket);

  useEffect(() => {
    socket.on(update_type, listener);

    return () => {
      socket.off(update_type, listener);
    };
  }, dependencies);
};

export { useSocket, send, useListener };
