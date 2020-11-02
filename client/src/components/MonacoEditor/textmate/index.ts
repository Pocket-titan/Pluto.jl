// This code (bar a few bits) is pretty much identical to https://github.com/bolinfest/monaco-tm/,
// the "official" solution recommended by the monaco-editor maintainers for getting textmate grammars working
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  createOnigScanner,
  createOnigString,
  loadWASM,
} from "vscode-oniguruma";
import type { LanguageId } from "./register";
import type { ScopeName, TextMateGrammar, ScopeNameInfo } from "./providers";
import { SimpleLanguageInfoProvider } from "./providers";
import { registerLanguages } from "./register";
import { rehydrateRegexps } from "./configuration";
import themes from "../themes";

let wasmLoaded = false;

export async function loadGrammars(themeName: string) {
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

  if (!wasmLoaded) {
    const data: ArrayBuffer | Response = await loadVSCodeOnigurumWASM();
    await loadWASM(data);
    wasmLoaded = true;
  }

  const onigLib = Promise.resolve({
    createOnigScanner,
    createOnigString,
  }) as any;

  let theme = themes.find(({ name }) => name === themeName);

  if (!theme) {
    throw new Error(`Could not find theme with name: ${themeName}`);
  }

  const provider = new SimpleLanguageInfoProvider({
    grammars,
    fetchGrammar,
    configurations: languages.map((language) => language.id),
    fetchConfiguration,
    theme: theme.textmate,
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
