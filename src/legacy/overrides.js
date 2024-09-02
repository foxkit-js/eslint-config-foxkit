const baseRules = require("../rules/base");
const tsRules = require("../rules/typescript");

module.exports = {
  "enable-cjs": {
    files: ["**/*.cjs"],
    parserOptions: { sourceType: "script" },
    rules: baseRules
  },
  "enable-mjs": {
    files: ["**/*.mjs"],
    parserOptions: { sourceType: "module" },
    rules: baseRules
  },
  typescript: {
    files: ["**/*.ts?(x)"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: "module",
      warnOnUnsupportedTypeScriptVersion: true
    },
    rules: tsRules
  }
};
