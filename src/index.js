const baseRules = require("./rules/base");
const tsRules = require("./rules/typescript");

const config = {
  plugins: ["no-await-in-promise", "@typescript-eslint"],
  parserOptions: { ecmaVersion: 2023 },
  env: { node: true, es2023: true },
  rules: baseRules,
  overrides: [
    {
      files: ["**/*.cjs"],
      parserOptions: { sourceType: "script" },
      rules: baseRules
    },
    {
      files: ["**/*.mjs"],
      parserOptions: { sourceType: "module" },
      rules: baseRules
    },
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true
      },
      rules: Object.assign({}, tsRules)
    }
  ]
};

if (process.env.npm_package_type === "module") {
  config.parserOptions.sourceType = "module";
}

module.exports.default = config;
