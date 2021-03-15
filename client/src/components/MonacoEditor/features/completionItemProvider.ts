import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { sendRequest } from "ts/socket";
import { getNotebookId } from "ts/utils";
import latexSymbols from "./latex-symbols";

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
  cl: 'println("$1:", $1)', // Special Michiel snippet 🐱‍👤
};

const kindMap: { [key: string]: monaco.languages.CompletionItemKind } = {
  Function: 1,
  Any: 7, // Interface
  Module: 8,
  Number: 12,
  Array: 15,
};

// FuzzyCompletions.jl injects these, but we do this on the frontend already, so we remove them :')
const sortedKeywords = [
  "abstract type",
  "baremodule",
  "begin",
  "break",
  "catch",
  "ccall",
  "const",
  "continue",
  "do",
  "else",
  "elseif",
  "end",
  "export",
  "false",
  "finally",
  "for",
  "function",
  "global",
  "if",
  "import",
  "let",
  "local",
  "macro",
  "module",
  "mutable struct",
  "primitive type",
  "quote",
  "return",
  "struct",
  "true",
  "try",
  "using",
  "while",
];

const completionItemProvider: monaco.languages.CompletionItemProvider = {
  triggerCharacters: [],
  resolveCompletionItem: async (item, token) => {
    let {
      body: { status, doc },
    } = await sendRequest("docs", {
      notebook_id: getNotebookId(),
      body: {
        query: typeof item.label === "string" ? item.label : item.label.name,
      },
    });

    if (status === "👍") {
      return {
        ...item,
        documentation: {
          value: doc,
          isTrusted: true,
          supportThemeIcons: true,
        },
      };
    }
  },
  provideCompletionItems: async (model, position, context, token) => {
    const { lineNumber, column } = position;

    let words = model
      .getValueInRange({
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column,
      })
      .replace("\t", "")
      .split(" ");
    let lastWord = words[words.length - 1];

    let suggestions: monaco.languages.CompletionItem[] = [];
    let wordInfo = model.getWordUntilPosition(position);

    if (lastWord.startsWith("\\")) {
      for (let [keyword, symbol] of Object.entries(latexSymbols)) {
        if (keyword.startsWith(lastWord)) {
          suggestions.push({
            label: {
              name: keyword,
              qualifier: symbol,
            },
            kind: monaco.languages.CompletionItemKind.Unit,
            insertText: symbol,
            range: new monaco.Range(
              lineNumber,
              column - lastWord.length,
              lineNumber,
              column - lastWord.length + symbol.length
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
            lineNumber,
            wordInfo.startColumn,
            lineNumber,
            wordInfo.endColumn + (snippet.length - wordInfo.word.length)
          ),
        });
      }
    }

    let {
      body: { start, stop, results },
    } = await sendRequest("complete", {
      notebook_id: getNotebookId(),
      body: {
        query: wordInfo.word,
      },
    });

    suggestions.push(
      ...results
        .filter(([name]) => !sortedKeywords.includes(name))
        .map(([name, type, isExported], i) => {
          return {
            label: {
              name,
              parameters: " parameters", // Parameters without return
              qualifier: `full_name`, // Full name
              type: "return", // Return type
            },
            kind: kindMap[type] || 21,
            insertText: name,
            range: new monaco.Range(lineNumber, start, lineNumber, stop),
          };
        })
    );

    return { suggestions };
  },
};

export default completionItemProvider;
