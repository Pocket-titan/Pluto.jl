import * as monaco from "monaco-editor";
import { loadWASM } from "onigasm";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
import night_owl from "monaco-themes/themes/Night Owl.json";
import one_dark from "../../themes/One Dark.json";

/** Setup languages and themes for monaco-editor */
export const initMonaco = () => {
  monaco.editor.defineTheme("nightowl", night_owl as any);
  monaco.editor.defineTheme("onedark", one_dark as any);

  monaco.languages.register({
    id: "julia",
    extensions: [".jl"],
    aliases: ["jl", "julia", "Julia", "Jl", "JL"],
    mimetypes: ["application/julia"],
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

      return {
        format: "json",
        content: await (await fetch(`/grammars/julia.tmLanguage.json`)).text(),
      };
    },
  });

  await loadWASM("/onigasm.wasm");

  const grammars = new Map();
  grammars.set("julia", "source.julia");

  await wireTmGrammars(monaco, registry, grammars);
};
