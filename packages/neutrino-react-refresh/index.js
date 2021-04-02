const babelMerge = require("babel-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = () => (neutrino) => {
  if (process.env.NODE_ENV === "development") {
    neutrino.config.plugin("react-refresh").use(ReactRefreshWebpackPlugin);
    neutrino.config.module
      .rule("compile")
      .use("babel")
      .tap((options) =>
        babelMerge(
          {
            plugins: [require.resolve("react-refresh/babel")],
          },
          options
        )
      );
  }
};
