import * as monaco from "monaco-editor";
import { send } from "../../../ts/pluto";
import { getNotebookId } from "../../../ts/utils";
import latex_symbols from "./latex_symbols";

const referenceProvider: monaco.languages.ReferenceProvider = {
  provideReferences: async (model, position, context, token) => {
    console.log("You requested references!");
    return new Promise((resolve) => {});
  },
};

const snippets: { [key: string]: string } = {
  abstract: "abstract type $0 end",
  baremodule: "baremodule $1\n\t$0\nend",
  begin: "begin\n\t$0\nend",
  break: "break",
  catch: "catch",
  const: "const ",
  continue: "continue",
  do: "do $1\n\t$0\nend",
  else: "else",
  elseif: "elseif ",
  end: "end",
  export: "export ",
  finally: "finally",
  for: "for $1 in $2\n\t$0\nend",
  function: "function $1($2)\n\t$0\nend",
  global: "global ",
  if: "if $1\n\t$0\nend",
  import: "import",
  let: "let $1\n\t$0\nend",
  local: "local ",
  macro: "macro $1($2)\n\t$0\nend",
  module: "module $1\n\t$0\nend",
  mutable: "mutable struct $0\nend",
  outer: "outer ",
  primitive: "primitive type $1 $0 end",
  quote: "quote\n\t$0\nend",
  return: "return",
  struct: "struct $0 end",
  try: "try\n\t$0\ncatch\nend",
  using: "using ",
  while: "while $1\n\t$0\nend",
  // Special Michiel snippet 🐱‍👤
  cl: 'println("$1:", $1)',
};

const createSuggestion = (): monaco.languages.CompletionItem | void => {
  // return {
  //   label: {
  //     name,
  //     parameters,
  //     qualifier,
  //     type,
  //   },
  //   kind,
  //   tags,
  //   detail,
  //   documentation,
  //   sortText,
  //   filterText,
  //   preselect,
  //   insertText,
  //   insertTextRules,
  //   range,
  //   commitCharacters,
  //   command,
  // }
};

const completionItemProvider: monaco.languages.CompletionItemProvider = {
  triggerCharacters: [],
  resolveCompletionItem: async (item, token) => {
    let {
      message: { status, doc },
    } = await send("docs", {
      notebook_id: getNotebookId(),
      body: {
        query: typeof item.label === "string" ? item.label : item.label.name,
      },
    });

    if (status === "👍") {
      return {
        ...item,
        documentation: doc,
      };
    }
  },
  provideCompletionItems: async (model, position, context, token) => {
    let last_chars = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 0,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });
    let words = last_chars.replace("\t", "").split(" ");
    let last_word = words[words.length - 1];

    let suggestions: monaco.languages.CompletionItem[] = [];
    let wordInfo = model.getWordUntilPosition(position);

    console.log("words, wordInfo", words, wordInfo);

    if (last_word.startsWith("\\")) {
      for (let [keyword, symbol] of Object.entries(latex_symbols)) {
        if (keyword.startsWith(last_word)) {
          suggestions.push({
            label: {
              name: keyword,
              qualifier: symbol,
            },
            kind: monaco.languages.CompletionItemKind.Unit,
            insertText: symbol,
            range: new monaco.Range(
              position.lineNumber,
              position.column - last_word.length,
              position.lineNumber,
              position.column - last_word.length + symbol.length
            ),
          });
        }
      }
    }

    for (let [keyword, snippet] of Object.entries(snippets)) {
      if (keyword.startsWith(wordInfo.word)) {
        suggestions.push({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet,
          insertTextRules: 4, // 4 = insert as snippet
          range: new monaco.Range(
            position.lineNumber,
            wordInfo.startColumn,
            position.lineNumber,
            wordInfo.endColumn + (snippet.length - wordInfo.word.length)
          ),
        });
      }
    }

    let {
      message: { start, stop, results },
    } = await send("complete", {
      notebook_id: getNotebookId(),
      body: {
        query: wordInfo.word,
      },
    });

    suggestions.push(
      ...results.map((result) => {
        return {
          label: {
            name: result,
            // Parameters without return
            parameters: " parameters",
            // Full name
            qualifier: `full_name`,
            // Return type
            type: "return",
          },
          kind: 1,
          insertText: result,
          range: new monaco.Range(
            position.lineNumber,
            start,
            position.lineNumber,
            stop
          ),
        };
      })
    );

    return { suggestions };
  },
};

const definitionProvider: monaco.languages.DefinitionProvider = {
  provideDefinition: (model, position, token) => {
    console.log("You requested definitions!");
    return new Promise((resolve) => {});
  },
};

const declarationProvider: monaco.languages.DeclarationProvider = {
  provideDeclaration: async (model, position, token) => {
    console.log("You requested declarations!");
    return new Promise((resolve) => {});
  },
};

const hoverProvider: monaco.languages.HoverProvider = {
  provideHover: async (model, position, token) => {
    console.log("You requested hovers!");

    return {
      contents: [],
      range: undefined,
    };
  },
};

const documentSymbolProvider: monaco.languages.DocumentSymbolProvider = {
  provideDocumentSymbols: async (model, token) => {
    console.log("You requested documentSymbols!");
    return new Promise((resolve) => {});
  },
};

const signatureHelpProvider: monaco.languages.SignatureHelpProvider = {
  provideSignatureHelp: async (model, token) => {
    console.log("You requested signatureHelp!");
    return new Promise((resolve) => {});
  },
};

export const registerProviders = () => {
  monaco.languages.registerReferenceProvider("julia", referenceProvider);
  monaco.languages.registerCompletionItemProvider(
    "julia",
    completionItemProvider
  );
  monaco.languages.registerDefinitionProvider("julia", definitionProvider);
  monaco.languages.registerDeclarationProvider("julia", declarationProvider);
  monaco.languages.registerHoverProvider("julia", hoverProvider);
  monaco.languages.registerDocumentSymbolProvider(
    "julia",
    documentSymbolProvider
  );
  monaco.languages.registerSignatureHelpProvider(
    "julia",
    signatureHelpProvider
  );
};
