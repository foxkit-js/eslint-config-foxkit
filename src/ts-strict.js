const { baseRules, recommendedRules } = require("./rules/ts");
const { strictRules } = require("./rules/ts-strict");

module.exports = {
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true
      },
      rules: Object.assign({}, baseRules, recommendedRules, strictRules)
    }
  ]
};
