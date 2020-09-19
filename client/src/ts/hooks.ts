import { useRef, useMemo, useEffect } from "react";
import normalizeUrl from "normalize-url";
import ReconnectingWebSocket from "reconnecting-websocket";

export const useWebsocket = (
  host: string,
  port: string | number,
  path: string = "/",
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
  const socket = useMemo(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const normalized_url = normalizeUrl(
      `${protocol}://${host}:${port}${path[0] === "/" ? "" : "/"}${path}`
    );

    return new ReconnectingWebSocket(normalized_url, [], {
      ...options,
    });
  }, []);

  return socket;
};
