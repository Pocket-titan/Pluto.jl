import {
  convertTheme,
  convertThemeFromDir,
} from "monaco-vscode-textmate-theme-converter";
import path from "path";

const main = () => {
  let inputDir = path.join(__dirname, "./in-themes");
  let outputDir = path.join(__dirname, "/out-themes");
  convertThemeFromDir(inputDir, outputDir);
};

main();
