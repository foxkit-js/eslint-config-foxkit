const foxkit = require("./src/configs/base");
const prettier = require("eslint-config-prettier");

module.exports = [
  { ignores: ["dist/**"] },
  {
    files: ["**/*.?(c)js"],
    languageOptions: { sourceType: "commonjs" }
  },
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: __dirname }),
  prettier
];
