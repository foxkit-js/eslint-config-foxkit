const baseRules = require("./rules/base");
const overrides = require("./legacy/overrides");

const config = {
  plugins: ["no-await-in-promise", "@typescript-eslint"],
  parserOptions: { ecmaVersion: 2024 },
  env: { node: true, es2024: true },
  rules: baseRules,
  overrides: [
    overrides["enable-cjs"],
    overrides["enable-mjs"],
    overrides.typescript
  ]
};

if (process.env.npm_package_type === "module") {
  config.parserOptions.sourceType = "module";
}

module.exports = config;
