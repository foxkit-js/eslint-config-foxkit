const eslint = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const foxkit = require("./src/configs/index.js");

module.exports = [
  { ignores: ["dist/**"] },
  {
    files: ["**/*.?(c)js"],
    languageOptions: { sourceType: "commonjs" }
  },
  eslint.configs.recommended,
  foxkit.configure({ strict: true }),
  prettier
];
