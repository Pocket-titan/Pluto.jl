import * as monaco from "monaco-editor";

const settings: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  wrappingStrategy: "advanced",
  wrappingIndent: "same",
  automaticLayout: true,
  foldingHighlight: false,
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
    alwaysConsumeMouseWheel: false,
  },
  // lineNumbers: "off",
  scrollBeyondLastLine: false,
  tabSize: 2,
  autoIndent: "full",
  autoClosingBrackets: "always",
  autoClosingQuotes: "always",
  autoClosingOvertype: "always",
  matchBrackets: "near",
  fontSize: 17,
  renderLineHighlightOnlyWhenFocus: true,
  renderIndentGuides: false,
  overviewRulerLanes: 0,
  lineNumbersMinChars: 3,
  padding: {
    top: 0,
    bottom: 0,
  },
};

export default settings;
