import * as monaco from "monaco-editor";

const definitionProvider: monaco.languages.DefinitionProvider = {
  provideDefinition: async (model, position, token) => {
    const { lineNumber, column } = position;

    let word = model.getWordAtPosition(position);
    if (!word) {
      return null;
    }

    let models = monaco.editor.getModels();

    for (let model of models) {
      let match = model.findNextMatch(
        word.word,
        new monaco.Position(0, 0),
        false,
        true,
        null,
        true
      );

      if (match) {
        return {
          uri: model.uri,
          range: match.range,
        };
      }
    }

    return null;
  },
};

export { definitionProvider };
