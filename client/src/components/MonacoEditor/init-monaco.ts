import * as monaco from "monaco-editor";
import { loadGrammars } from "./textmate";
import { GET_DEFAULT_THEME } from "./default-settings";
import { registerProviders } from "./features";
import themes from "./themes";

let loaded = false;

/** This bad boy 1) registers the editor feature providers, 2) loads our textmate grammars,
 * and 3) loads & defines our (textmate + "regular" monaco) themes */
async function initMonaco() {
  if (loaded) {
    return;
  }

  loaded = true;

  registerProviders();

  let languageProvider = await loadGrammars(GET_DEFAULT_THEME());

  themes.forEach((theme) => {
    monaco.editor.defineTheme(theme.name, theme.monaco);
  });

  const setTheme = monaco.editor.setTheme;
  monaco.editor.setTheme = (themeName) => {
    setTheme(themeName);

    // (Re-)Inject the new theme's textmate colors
    let theme = themes.find(({ name }) => name === themeName);
    if (theme) {
      languageProvider.registry.setTheme(theme.textmate);
      languageProvider.injectCSS();
    }
  };

  return languageProvider;
}

export default initMonaco;
