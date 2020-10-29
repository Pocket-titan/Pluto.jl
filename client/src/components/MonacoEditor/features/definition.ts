import * as monaco from "monaco-editor";

const definitionProvider: monaco.languages.DefinitionProvider = {
  provideDefinition: async (model, position, token) => {
    const { lineNumber, column } = position;

    return {
      uri: monaco.Uri.parse(""),
      range: {
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column,
      },
    };
  },
};

export { definitionProvider };
