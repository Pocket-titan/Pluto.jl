import * as monaco from "monaco-editor";
import { loadWASM } from "onigasm";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
// import night_owl from "monaco-themes/themes/Night Owl.json";
// import one_dark from "./themes/One Dark.json";
// import horizon from "./themes/Horizon.json";
// import atom_one_dark from "./textmate/themes/atom-one-dark-theme";
// import atom_one_dark from "./textmate/themes/HorizonTest.json";

/** Setup languages and themes for monaco-editor */
export const initMonaco = () => {
  // monaco.editor.defineTheme("nightowl", night_owl as any);
  // monaco.editor.defineTheme("onedark", one_dark as any);
  // monaco.editor.defineTheme("horizon", horizon as any);
  // monaco.editor.defineTheme("atom-one-dark", atom_one_dark as any);

  monaco.languages.register({
    id: "julia",
    extensions: [".jl"],
    aliases: ["jl", "julia", "Julia", "Jl", "JL"],
    mimetypes: ["application/julia"],
  });

  monaco.languages.register({
    id: "juliamarkdown",
    extensions: [".jmd"],
    aliases: ["jmd", "juliamarkdown", "julia Markdown"],
    // mimetypes: ["application/julia"],
  });

  monaco.languages.setLanguageConfiguration("julia", {
    indentationRules: {
      increaseIndentPattern: /^(\s*|.*=\s*|.*@\w*\s*)[\w\s]*\b(if|while|for|function|macro|immutable|struct|type|let|quote|try|begin|.*\)\s*do|else|elseif|catch|finally)\b(?!.*\bend\b[^\]]*$).*$/,
      decreaseIndentPattern: /^\s*(end|else|elseif|catch|finally)\b.*$/,
      indentNextLinePattern: null,
      unIndentedLinePattern: null,
    },
  });
};

/** Load onigasm.wasm and Julia tmGrammar */
export const liftOff = async () => {
  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      if (scopeName === "source.julia") {
        return {
          format: "json",
          content: await (
            await fetch(`/grammars/julia.tmLanguage.json`)
          ).text(),
        };
      }

      if (scopeName === "meta.embedded.inline.markdown") {
        return {
          format: "json",
          content: await (
            await fetch(`/grammars/juliamarkdown.tmLanguage.json`)
          ).text(),
        };
      }

      return {
        format: "json",
        content: await (await fetch(`/grammars/julia.tmLanguage.json`)).text(),
      };
    },
  });

  await loadWASM("/onigasm.wasm");

  const grammars = new Map();
  grammars.set("julia", "source.julia");
  grammars.set("juliamarkdown", "text.html.markdown.julia");

  await wireTmGrammars(monaco, registry, grammars);
};

/** Had some fun with this, prolly not going to implement my own highlighting tho */
export const initTreeSitter = async () => {
  const treeSitterWasmUrl = "tree-sitter.wasm";
  const realFetch = window.fetch;
  window.fetch = function () {
    if (arguments[0].endsWith("/tree-sitter.wasm"))
      arguments[0] = treeSitterWasmUrl;
    return realFetch.apply(window, arguments as any);
  };

  const Parser = (await import("web-tree-sitter")).default;
  await Parser.init();
  const parser = new Parser();
  const language = await Parser.Language.load("tree-sitter-julia.wasm");
  parser.setLanguage(language);
  const tree = parser.parse("x = 5;");
  console.log(tree.rootNode.toString());
};
