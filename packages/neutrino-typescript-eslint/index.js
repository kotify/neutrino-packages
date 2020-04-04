const merge = require("deepmerge");

module.exports = (options, extendsReact = false) => (neutrino) => {
  const defaults = {
    parserOptions: {
      project: "./tsconfig.json",
    },
    extends: [
      "standard",
      "plugin:import/typescript",
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:eslint-comments/recommended",
    ]
      .concat(extendsReact ? ["plugin:react/recommended"] : [])
      .concat(["prettier", "prettier/@typescript-eslint", "prettier/standard"])
      .concat(extendsReact ? ["prettier/react"] : []),
    rules: {
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : 0,
      "no-console": process.env.NODE_ENV === "production" ? "error" : 0,
      "prefer-const": "error",
      "eslint-comments/no-unused-disable": "error",
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
