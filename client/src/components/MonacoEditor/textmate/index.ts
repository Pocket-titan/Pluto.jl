import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  createOnigScanner,
  createOnigString,
  loadWASM,
} from "vscode-oniguruma";
import type { LanguageId } from "./register";
import type { ScopeName, TextMateGrammar, ScopeNameInfo } from "./providers";
import type { IRawTheme } from "vscode-textmate";
import { SimpleLanguageInfoProvider } from "./providers";
import { registerLanguages } from "./register";
import { rehydrateRegexps } from "./configuration";
import themes from "../themes";
import AtomOneDarkTextmate from "./atom-one-dark";
import defineTheme from "../define-theme";

async function loadGrammars() {
  const languages: monaco.languages.ILanguageExtensionPoint[] = [
    {
      id: "julia",
      extensions: [".jl"],
      aliases: ["jl", "julia", "Julia", "Jl", "JL"],
      mimetypes: ["application/julia"],
    },
  ];

  const grammars: { [scopeName: string]: ScopeNameInfo & { path: string } } = {
    "source.julia": {
      language: "julia",
      path: "julia.tmGrammar.json",
    },
  };

  const fetchGrammar = async (
    scopeName: ScopeName
  ): Promise<TextMateGrammar> => {
    const { path } = grammars[scopeName];
    const uri = `/grammars/${path}`;
    const response = await fetch(uri);
    const grammar = await response.text();
    const type = path.endsWith(".json") ? "json" : "plist";
    return { type, grammar };
  };

  const fetchConfiguration = async (
    language: LanguageId
  ): Promise<monaco.languages.LanguageConfiguration> => {
    const uri = `/configurations/${language}.json`;
    const response = await fetch(uri);
    const rawConfiguration = await response.text();
    return rehydrateRegexps(rawConfiguration);
  };

  const data: ArrayBuffer | Response = await loadVSCodeOnigurumWASM();
  await loadWASM(data);
  const onigLib = Promise.resolve({
    createOnigScanner,
    createOnigString,
  }) as any;

  const provider = new SimpleLanguageInfoProvider({
    grammars,
    fetchGrammar,
    configurations: languages.map((language) => language.id),
    fetchConfiguration,
    theme: AtomOneDarkTextmate,
    onigLib,
    monaco,
  });

  registerLanguages(
    languages,
    (language: LanguageId) => provider.fetchLanguageInfo(language),
    monaco
  );

  return provider;
}

async function loadVSCodeOnigurumWASM(): Promise<Response | ArrayBuffer> {
  const response = await fetch("/onig.wasm"); // This file should be made available in the /public folder!
  const contentType = response.headers.get("content-type");
  if (contentType === "application/wasm") {
    return response;
  }

  return await response.arrayBuffer();
}

// function setupThemes() {
//   themes.forEach(({ id, content }) => {
//     defineTheme(id, content);
//   });
// }

let monacoLoaded = false;

export async function initMonaco() {
  if (monacoLoaded) {
    return;
  }
  monacoLoaded = true;

  themes.forEach(({ id, content }) => {
    defineTheme(id, content);
  });

  let languageProvider = await loadGrammars();

  const setTheme = monaco.editor.setTheme;
  monaco.editor.setTheme = (themeName) => {
    setTheme(themeName);
    languageProvider.registry.setTheme();
    languageProvider.injectCSS();
  };
}
