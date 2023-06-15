const { baseRules } = require("./rules/base");

const config = {
  plugins: ["no-await-in-promise"],
  parserOptions: { ecmaVersion: 2022 },
  env: { node: true, es2022: true },
  rules: baseRules,
  overrides: [
    {
      files: ["**/*.cjs"],
      parserOptions: { sourceType: "script" }
    },
    {
      files: ["**/*.mjs"],
      parserOptions: { sourceType: "module" }
    }
  ]
};

if (process.env.npm_package_type === "module") {
  config.parserOptions.sourceType = "module";
}

module.exports = config;
