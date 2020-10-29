import * as monaco from "monaco-editor";

const referenceProvider: monaco.languages.ReferenceProvider = {
  provideReferences: async (model, position, context, token) => {
    const { lineNumber, column } = position;

    return [
      {
        uri: monaco.Uri.parse(""),
        range: {
          startLineNumber: lineNumber,
          startColumn: 0,
          endLineNumber: lineNumber,
          endColumn: column,
        },
      },
    ];
  },
};

export { referenceProvider };
