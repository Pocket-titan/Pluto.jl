import React, { useEffect } from "react";
import ReconnectingWebsocket, { UrlProvider } from "reconnecting-websocket";
import normalizeUrl from "normalize-url";
import create from "zustand";
import { encodeMessage, decodeMessage } from "./msgpack";
import { getUniqueShortId, getNotebookId } from "./utils";
import type {
  Message,
  MessageType,
  Update,
  UpdateType,
  Listener,
  ResponseMap,
} from "./types";

function createWebsocket(
  urlProvider: UrlProvider,
  options?: {
    maxReconnectionDelay?: number;
    minReconnectionDelay?: number;
    reconnectionDelayGrowFactor?: number;
    connectionTimeout?: number;
    maxRetries?: number;
    debug?: boolean;
  }
): ReconnectingWebsocket {
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
}

class Socket {
  private client_id: string = getUniqueShortId();
  private listeners = new Map<string, Set<Listener>>();
  private requests = new Map<string, Listener>();
  private socket: ReconnectingWebsocket;

  constructor(port: number = 1234) {
    let socket = createWebsocket(() => {
      let { protocol, hostname } = window.location;
      return `${protocol === "https:" ? "wss" : "ws"}://${hostname}:${port}/`;
    });

    socket.onmessage = async (event) => {
      let buffer: ArrayBuffer = await event.data.arrayBuffer();
      let update = decodeMessage(buffer);

      console.log("🦖 Received update", update);

      let initiatedByMe = update?.initiator_id === this.client_id;
      if (initiatedByMe) {
        // If it was initiated by me, but I'm not waiting for a response, talk to the hand 💁‍♀️
        if (!update.request_id) {
          return;
        }

        let request = this.requests.get(update.request_id);
        if (request) {
          request(update.body);
          this.requests.delete(update.request_id);
        }
      } else {
        // It didn't come from myself, so either the server or someone else is notifying us
        this.listeners.get(update.type)?.forEach((listener) => {
          listener(update);
        });
      }
    };

    this.socket = socket;
  }

  /** Messages _do_ receive a response */
  async sendMessage<T extends MessageType & keyof ResponseMap>(
    type: T,
    rest: Partial<Exclude<Message<T>, "type" | "request_id" | "client_id">> = {}
  ): Promise<Update<ResponseMap[T]>["body"]> {
    let message = {
      type,
      request_id: getUniqueShortId(),
      client_id: this.client_id,
      body: {},
      ...rest,
    };

    console.log("🦖 Sending message", message);

    let encodedMessage = encodeMessage(message);
    this.socket.send(encodedMessage);

    return new Promise((resolve) => {
      this.requests.set(message.request_id, resolve);
    });
  }

  /** Notifications _don't_ receive a response */
  sendNotification<T extends MessageType>(
    type: T,
    rest: Partial<Exclude<Message<T>, "type" | "request_id" | "client_id">> = {}
  ) {
    let message = {
      type,
      request_id: getUniqueShortId(),
      client_id: this.client_id,
      body: {},
      ...rest,
    };

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

/** Just for storing the socket - you shouldn't need to access this yourself! */
const useSocket = create<{ socket: Socket }>((set, get) => ({
  socket: new Socket(),
}));

/** Send a message; does receive a response */
async function sendMessage<T extends MessageType & keyof ResponseMap>(
  type: T,
  rest: Partial<Exclude<Message<T>, "type" | "request_id" | "client_id">> = {}
) {
  const socket = useSocket.getState().socket;
  return socket.sendMessage<T>(type, rest);
}

/** Send a notification; does not receive a response */
function sendNotification<T extends MessageType>(
  type: T,
  rest: Partial<Exclude<Message<T>, "type" | "request_id" | "client_id">> = {}
) {
  const socket = useSocket.getState().socket;
  socket.sendNotification<T>(type, rest);
}

/** Listen to notifications from the server */
function useListener<T extends UpdateType>(
  type: T,
  listener: Listener<T>,
  dependencies?: React.DependencyList
) {
  const socket = useSocket((state) => state.socket);

  useEffect(() => {
    socket.on(type, listener);

    return () => {
      socket.off(type, listener);
    };
  }, dependencies);
}

export { sendMessage, sendNotification, useListener };
