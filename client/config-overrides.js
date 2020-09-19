const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ["typescript", "javascript", "json", "html", "css"],
    })
  );
  config.resolve.alias.vscode = require.resolve(
    "monaco-languageclient/lib/vscode-compatibility"
  );
  return config;
};
