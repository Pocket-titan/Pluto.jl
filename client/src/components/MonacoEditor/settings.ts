import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const settings: monaco.editor.IStandaloneEditorConstructionOptions = {
  foldingHighlight: false,
  minimap: {
    enabled: false,
  },
  overviewRulerLanes: 0,
  renderIndentGuides: false,
  renderLineHighlight: "none",
  scrollbar: {
    alwaysConsumeMouseWheel: false,
    arrowSize: 30,
    horizontal: "hidden",
    horizontalHasArrows: false,
    horizontalScrollbarSize: 0,
    useShadows: false,
    vertical: "hidden",
    verticalHasArrows: false,
    verticalScrollbarSize: 0,
  },
  scrollBeyondLastLine: false,
  wordWrap: "on",
  folding: false,
};

export default settings;
