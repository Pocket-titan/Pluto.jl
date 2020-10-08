import * as monaco from "monaco-editor";

const referenceProvider: monaco.languages.ReferenceProvider = {
  provideReferences: (model, position, context, token) => {
    return new Promise((resolve) => {
      let models = monaco.editor.getModels();
      console.log("models", models);
    });
  },
};

const completionItemProvider: monaco.languages.CompletionItemProvider = {
  provideCompletionItems: async (model, position, context, token) => {
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
    return new Promise((resolve) => {
      let models = monaco.editor.getModels();
      console.log("def", models);
    });
  },
};

export const registerProviders = () => {
  monaco.languages.registerReferenceProvider("julia", referenceProvider);
  monaco.languages.registerCompletionItemProvider(
    "julia",
    completionItemProvider
  );
  monaco.languages.registerDefinitionProvider("julia", definitionProvider);
};
