const promisePlugin = require("eslint-plugin-no-await-in-promise");
const globals = require("globals");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const baseRules = require("../rules/base.js");
const tsRules = require("../rules/typescript.js");

const tsFiles = ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx"];

module.exports = {
  /**
   * Base Configuration for JavaScript developement
   */
  base: {
    plugins: {
      "no-await-in-promise": promisePlugin
    },
    languageOptions: {
      ecmaVersion: 2023,
      globals: Object.assign(
        {},
        globals.nodeBuiltin,
        globals.node,
        globals.browser
      )
    },
    rules: Object.assign({}, baseRules)
  },
  /**
   * Base Configuration for TypeScript development
   */
  typescript: {
    files: tsFiles,
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true
      }
    },
    rules: Object.assign({}, tsRules)
  },
  /**
   * Utility to configure typescript-eslint parserOptions
   */
  configureTS({ project, tsconfigRootDir } = {}) {
    const parserOptions = {};
    if (!project && !tsconfigRootDir) {
      throw new Error(
        "Must set either project or tsconfigRootDir in foxkitTS.configure"
      );
    }

    if (tsconfigRootDir) {
      parserOptions.project = true;
      parserOptions.tsconfigRootDir = tsconfigRootDir;
    }

    if (project) parserOptions.project = project;

    return { files: tsFiles, languageOptions: { parserOptions } };
  }
};
