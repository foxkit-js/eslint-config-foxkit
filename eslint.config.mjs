import prettier from "eslint-config-prettier";
import foxkit from "./src/flat.js";

console.log("Linting with Flat config (mjs)");

export default [
  { ignores: ["dist/**"] },
  {
    files: ["**/*.?(c)js"],
    languageOptions: { sourceType: "commonjs" }
  },
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: import.meta.dirname }),
  prettier
];
