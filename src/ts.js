const { baseRules, recommendedRules } = require("./rules/ts");

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
      rules: Object.assign({}, baseRules, recommendedRules)
    }
  ]
};
