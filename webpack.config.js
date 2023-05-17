const webpack = require("@nativescript/webpack");

module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.chainWebpack((config) => {
    // ignore base env tsconfig warning
    config.set(
      "ignoreWarnings",
      (config.get("ignoreWarnings") || []).concat([
        /app\/config/
      ])
    );
  });

  return webpack.resolveConfig();
};
