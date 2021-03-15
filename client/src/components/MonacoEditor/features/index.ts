import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import completionItemProvider from "./completionItemProvider";

monaco.languages.registerCompletionItemProvider(
  "julia",
  completionItemProvider
);
