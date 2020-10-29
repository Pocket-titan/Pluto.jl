import * as monaco from "monaco-editor";

const hoverProvider: monaco.languages.HoverProvider = {
  provideHover: async (model, position, token) => {
    const { lineNumber, column } = position;

    return {
      contents: [
        {
          value: "I am an example hover",
          isTrusted: true,
          supportThemeIcons: true,
          uris: {},
        },
      ],
      range: {
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column,
      },
    };
  },
};

export { hoverProvider };
