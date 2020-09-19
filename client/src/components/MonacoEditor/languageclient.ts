import { MessageConnection } from "vscode-ws-jsonrpc";
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  createConnection,
} from "monaco-languageclient";

export const createLanguageClient = (
  connection: MessageConnection
): MonacoLanguageClient => {
  return new MonacoLanguageClient({
    name: "Julia Language Client",
    clientOptions: {
      // use a language id as a document selector
      documentSelector: [{ language: "julia" }],
      // documentSelector: [{ language: "julia", pattern: "/*" }],
      // disable the default error handler
      errorHandler: {
        error: () => ErrorAction.Continue,
        closed: () => CloseAction.DoNotRestart,
      },
      // middleware: {
      //   workspace: {
      //     configuration: (params: any, token: any, configuration: any) => {
      //       // return Array((configuration(params, token) as {}[]).length).fill(
      //       //   config.lsp!.config !== undefined ? config.lsp!.config : {}
      //       // );
      //       console.log(
      //         "params, token, configuration",
      //         params,
      //         token,
      //         configuration
      //       );
      //     },
      //   },
      // },
    },
    // create a language client connection from the JSON RPC connection on demand
    connectionProvider: {
      get: (errorHandler, closeHandler) => {
        console.log("CONN");
        return Promise.resolve(
          createConnection(connection, errorHandler, closeHandler)
        );
      },
    },
  });
};
