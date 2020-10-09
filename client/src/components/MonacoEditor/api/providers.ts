import * as monaco from "monaco-editor";

const referenceProvider: monaco.languages.ReferenceProvider = {
  provideReferences: async (model, position, context, token) => {
    console.log("You requested references!");
    return new Promise((resolve) => {});
  },
};

const completionItemProvider: monaco.languages.CompletionItemProvider = {
  provideCompletionItems: async (model, position, context, token) => {
    console.log("You requested completionItems!");

    const wordInfo = model.getWordUntilPosition(position);
    const wordRange = new monaco.Range(
      position.lineNumber,
      wordInfo.startColumn,
      position.lineNumber,
      wordInfo.endColumn
    );
    const resource = model.uri;
    const offset = model.getOffsetAt(position);

    let suggestions: monaco.languages.CompletionItem[] = [
      {
        label: "wow",
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: "simpleText",
        range: wordRange,
      },
    ];

    return { suggestions };
  },
};

const definitionProvider: monaco.languages.DefinitionProvider = {
  provideDefinition: (model, position, token) => {
    console.log("You requested definitions!");
    return new Promise((resolve) => {});
  },
};

const declarationProvider: monaco.languages.DeclarationProvider = {
  provideDeclaration: async (model, position, token) => {
    console.log("You requested declarations!");
    return new Promise((resolve) => {});
  },
};

const hoverProvider: monaco.languages.HoverProvider = {
  provideHover: async (model, position, token) => {
    console.log("You requested hovers!");
    return new Promise((resolve) => {});
  },
};

const documentSymbolProvider: monaco.languages.DocumentSymbolProvider = {
  provideDocumentSymbols: async (model, token) => {
    console.log("You requested documentSymbols!");
    return new Promise((resolve) => {});
  },
};

const signatureHelpProvider: monaco.languages.SignatureHelpProvider = {
  provideSignatureHelp: async (model, token) => {
    console.log("You requested signatureHelp!");
    return new Promise((resolve) => {});
  },
};

export const registerProviders = () => {
  monaco.languages.registerReferenceProvider("julia", referenceProvider);
  monaco.languages.registerCompletionItemProvider(
    "julia",
    completionItemProvider
  );
  monaco.languages.registerDefinitionProvider("julia", definitionProvider);
  monaco.languages.registerDeclarationProvider("julia", declarationProvider);
  monaco.languages.registerHoverProvider("julia", hoverProvider);
  monaco.languages.registerDocumentSymbolProvider(
    "julia",
    documentSymbolProvider
  );
  monaco.languages.registerSignatureHelpProvider(
    "julia",
    signatureHelpProvider
  );
};
