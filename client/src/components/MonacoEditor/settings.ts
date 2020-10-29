import * as monaco from "monaco-editor";

// Since we depend on some code to set the theme on window, this is a function instead of a value
export const GET_DEFAULT_THEME = () =>
  window.__theme === "dark" ? "atom-one-dark" : "atom-one-light";

const settings: monaco.editor.IStandaloneEditorConstructionOptions = {
  language: "julia",
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
