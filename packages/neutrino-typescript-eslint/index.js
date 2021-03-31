const merge = require("deepmerge");

module.exports = (options = {}, config = { react: false }) => (neutrino) => {
  let defaults = {
    parser: "@typescript-eslint/parser",
    extends: [
      "standard",
      "plugin:import/typescript",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:eslint-comments/recommended",
    ]
      .concat(
        config.react
          ? ["plugin:react/recommended", "plugin:react-hooks/recommended"]
          : []
      )
      .concat(["prettier"])
      .concat(config.react ? ["prettier/react"] : []),
    rules: {
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : 0,
      "no-console": process.env.NODE_ENV === "production" ? "error" : 0,
      "prefer-const": "error",
      "eslint-comments/no-unused-disable": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
    },
  };
  if (config.react) {
    defaults = merge(defaults, {
      rules: {
        "react/prop-types": 0,
      },
      settings: { react: { version: "detect" } },
    });
  }
  const mergedOptions = merge(defaults, options);
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
