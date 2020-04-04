const merge = require("deepmerge");

module.exports = (options, extendsReact = false) => (neutrino) => {
  const defaults = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint", "standard"],
    extends: [
      "standard",
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
    ]
      .concat(extendsReact ? ["plugin:react/recommended"] : [])
      .concat(["prettier", "prettier/@typescript-eslint", "prettier/standard"])
      .concat(extendsReact ? ["prettier/react"] : []),
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  };
  const mergedOptions = merge(defaults, options || {});
  neutrino.config.module
    .rule("lint")
    .test(/\.(mjs|jsx|js|tsx|ts)$/)
    .use("eslint")
    .tap((baseOptions) => {
      if (baseOptions.useEslintrc) {
        return baseOptions;
      }
      return merge(baseOptions, { baseConfig: mergedOptions });
    });
};
