const merge = require("deepmerge");
const babelMerge = require("babel-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (options = {}) => neutrino => {
  neutrino.config.resolve.extensions.add(".tsx").add(".ts");
  neutrino.config.module
    .rule("compile")
    .test(/\.(mjs|jsx|js|tsx|ts)$/)
    .use("babel")
    .tap(options =>
      babelMerge(options, {
        presets: [require.resolve("@babel/preset-typescript")]
      })
    );

  if (process.env.NODE_ENV === "development") {
    const forkTSChecker = merge(
      { enable: true, options: {} },
      options.forkTSChecker || {}
    );
    if (forkTSChecker.enable) {
      neutrino.config
        .plugin("fork-ts-checker")
        .use(ForkTsCheckerWebpackPlugin, [forkTSChecker.options]);
    }
  }
};
