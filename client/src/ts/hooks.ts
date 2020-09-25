import { useMemo } from "react";
import normalizeUrl from "normalize-url";
import ReconnectingWebSocket, { UrlProvider } from "reconnecting-websocket";
import create from "zustand";
import { pack } from "./msgpack";

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

const MSG_DELIM = new TextEncoder().encode("IUUQ.km jt ejggjdvmu vhi");
const PORT = 1234;

export const usePluto = create<{
  socket: ReconnectingWebSocket;
  send: (message: any) => Promise<void>;
}>((set, get) => ({
  socket: createWebsocket(
    async () => {
      const { protocol, hostname } = document.location;
      let url = `${protocol}//${hostname}:${PORT}/websocket_url_please`;
      let secret = await (await fetch(url)).text();
      return normalizeUrl(
        `${protocol === "https:" ? "wss" : "ws"}://localhost:${PORT}/${secret}`
      );
    },
    { debug: true }
  ),
  send: async (message: any) => {
    const encoded = pack(message);
    const to_send = new Uint8Array(encoded.length + MSG_DELIM.length);
    to_send.set(encoded, 0);
    to_send.set(MSG_DELIM, encoded.length);
    get().socket!.send(to_send);
  },
}));
