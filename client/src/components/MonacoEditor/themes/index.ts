// The themes in this directory should be .json files created by doing
// "Generate color theme from current settings" in VSCode
import * as monaco from "monaco-editor";
import type { IRawTheme } from "vscode-textmate";
import Color from "color";
import _ from "lodash";
import AtomOneDark from "./atom-one-dark.json";
import AtomOneLight from "./atom-one-light.json";

const themes: {
  name: string;
  vscode: VSCodeTheme;
  monaco: monaco.editor.IStandaloneThemeData;
  textmate: IRawTheme;
}[] = [
  {
    name: "atom-one-dark",
    vscode: AtomOneDark,
  },
  {
    name: "atom-one-light",
    vscode: AtomOneLight,
  },
].map((theme) => {
  let monaco = convertVscodeThemeToMonaco(theme.vscode);
  let textmate = convertMonacoThemeToTextmate(monaco);

  return {
    ...theme,
    monaco,
    textmate,
  };
});

export default themes;

type VSCodeTheme = {
  $schema: string;
  type: string;
  colors: {
    [name: string]: string;
  };
  tokenColors: {
    name?: string;
    scope: string[] | string;
    settings: {
      foreground?: string;
      background?: string;
      fontStyle?: string;
    };
  }[];
};

function sanitizeColor(color: string): string {
  if (/#......$/.test(color) || /#........$/.test(color)) {
    return color;
  }

  try {
    return new Color(color).hex();
  } catch (e) {
    return "#FF0000";
  }
}

export function convertVscodeThemeToMonaco(
  theme: VSCodeTheme
): monaco.editor.IStandaloneThemeData {
  let base: monaco.editor.BuiltinTheme =
    theme.type === "dark" ? "vs-dark" : theme.type === "hc" ? "hc-black" : "vs";

  const rules = (theme.tokenColors || [])
    .filter(
      (token) =>
        token.scope &&
        token.settings &&
        token.settings.foreground !== "inherit" &&
        token.settings.background !== "inherit"
    )
    .reduce((arr: monaco.editor.ITokenThemeRule[], token) => {
      let settings = _.omitBy(
        token.settings,
        (x) => typeof x !== "string"
      ) as _.Dictionary<string>; // idk why lodash is being stupid w types here
      settings.foreground = sanitizeColor(settings.foreground);
      settings.background = sanitizeColor(settings.background);

      const scope =
        typeof token.scope === "string"
          ? token.scope.split(",").map((a: string) => a.trim())
          : token.scope;

      scope.forEach((s) =>
        arr.push({
          token: s,
          ...settings,
        })
      );

      return arr;
    }, []);

  const colors = theme.colors || {};

  return {
    base,
    inherit: true,
    rules,
    colors,
  };
}

export function convertMonacoThemeToTextmate(
  theme: monaco.editor.IStandaloneThemeData
): IRawTheme {
  let settings = theme.rules.map((rule) => ({
    scope: rule.token,
    settings: _.pickBy(
      {
        foreground: rule.foreground,
        background: rule.background,
        fontStyle: rule.fontStyle,
      },
      _.identity
    ),
  }));

  return {
    name: "",
    settings: [
      {
        settings: _.pickBy(
          {
            background: theme.colors["editor.background"],
            foreground: theme.colors["editor.foreground"],
          },
          _.identity
        ),
      },
      ...settings,
    ],
  };
}
