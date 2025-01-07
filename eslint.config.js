const prettier = require("eslint-config-prettier");
const foxkit = require("./src/flat");

console.log("Linting with Flat config (cjs)");

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
