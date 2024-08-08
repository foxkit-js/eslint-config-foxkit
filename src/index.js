const baseRules = require("./rules/base");

const config = {
  plugins: ["no-await-in-promise"],
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
    }
  ]
};

if (process.env.npm_package_type === "module") {
  config.parserOptions.sourceType = "module";
}

module.exports = config;
