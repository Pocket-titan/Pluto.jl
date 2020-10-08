const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { override } = require("customize-cra");

function myOverrides(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: [
        "typescript",
        "javascript",
        "json",
        "html",
        "css",
        "markdown",
      ],
    })
  );

  config.node = {
    ...config.node,
    fs: "empty",
  };

  if (!config.module.rules) {
    config.module.rules = [];
  }

  config.module.rules.push({
    test: /\.wasm$/,
    loader: "file-loader",
    type: "javascript/auto", // Disable Webpack's built-in WASM loader
  });

  config.resolve.alias.vscode = require.resolve(
    "monaco-languageclient/lib/vscode-compatibility"
  );

  return config;
}

module.exports = override(myOverrides);
