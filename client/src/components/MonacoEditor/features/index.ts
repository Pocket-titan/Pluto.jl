import * as monaco from "monaco-editor";
import { hoverProvider } from "./hover";
import { definitionProvider } from "./definition";
import { referenceProvider } from "./reference";
import { completionItemProvider } from "./completion";

function registerProviders() {
  monaco.languages.registerHoverProvider("julia", hoverProvider);
  monaco.languages.registerDefinitionProvider("julia", definitionProvider);
  monaco.languages.registerReferenceProvider("julia", referenceProvider);
  monaco.languages.registerCompletionItemProvider(
    "julia",
    completionItemProvider
  );
}

export { registerProviders };
