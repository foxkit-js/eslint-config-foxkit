const { baseRules, recommendedRules } = require("./rules/typescript");
const { strictRules } = require("./rules/typescript-strict");

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
      rules: Object.assign({}, baseRules, recommendedRules, strictRules)
    }
  ]
};
