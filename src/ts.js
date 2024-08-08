const tsRules = require("./rules/typescript");

/**
 * @deprecated
 */
module.exports = {
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.astro"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true
      },
      rules: Object.assign({}, tsRules)
    }
  ]
};
