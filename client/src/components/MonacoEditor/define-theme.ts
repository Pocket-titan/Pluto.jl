import * as monaco from "monaco-editor";
import Color from "color";

type VSCodeTheme = {
  $schema: string;
  type: string;
  colors: { [name: string]: string };
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
  if (!color) {
    return color;
  }

  if (/#......$/.test(color) || /#........$/.test(color)) {
    return color;
  }

  try {
    return new Color(color).hex();
  } catch (e) {
    return "#FF0000";
  }
}

function colorsAllowed({
  foreground,
  background,
}: {
  foreground?: string;
  background?: string;
}) {
  if (foreground === "inherit" || background === "inherit") {
    return false;
  }

  return true;
}

function transformTheme(
  theme: VSCodeTheme
): monaco.editor.IStandaloneThemeData {
  const { tokenColors = [], colors = {} } = theme;
  const rules = tokenColors
    .filter((t) => t.settings && t.scope && colorsAllowed(t.settings))
    .reduce((acc: monaco.editor.ITokenThemeRule[], token) => {
      const settings = {
        foreground: token.settings.foreground
          ? sanitizeColor(token.settings.foreground)
          : undefined,
        background: token.settings.background
          ? sanitizeColor(token.settings.background)
          : undefined,
        fontStyle: token.settings.fontStyle,
      };

      console.log(
        `before: %c ${token.settings.foreground}`,
        `background: ${token.settings.foreground}`
      );

      console.log(
        `after: %c ${settings.foreground}`,
        `background: ${settings.foreground}`
      );

      const scope =
        typeof token.scope === "string"
          ? token.scope.split(",").map((a: string) => a.trim())
          : token.scope;

      scope.map((s) =>
        acc.push({
          token: s,
          ...settings,
        })
      );

      return acc;
    }, []);

  const newColors = colors;
  Object.keys(colors).forEach((c) => {
    if (newColors[c]) return c;

    delete newColors[c];

    return c;
  });

  return {
    base: getBase(theme.type),
    inherit: true,
    colors: newColors,
    rules,
  };
}

function getBase(type: string) {
  if (type === "dark") {
    return "vs-dark";
  }

  if (type === "hc") {
    return "hc-black";
  }

  return "vs";
}

function defineTheme(name: string, theme: VSCodeTheme) {
  if (theme && monaco.editor.defineTheme) {
    const transformedTheme = transformTheme(theme);

    try {
      monaco.editor.defineTheme(name, transformedTheme);
    } catch (e) {
      console.error(e);
    }
  }
}

export default defineTheme;
