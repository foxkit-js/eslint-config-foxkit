// @ts-check
const promisePlugin = require("eslint-plugin-no-await-in-promise");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const baseRules = require("./rules/base.js");
const tsRules = require("./rules/typescript.js");

/**
 * Array of extensions used for typescript files by default
 */
const tsFiles = ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx"];

module.exports = {
  /**
   * Base Configuration for JavaScript developement
   * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}
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
   * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config}
   */
  typescript: {
    files: tsFiles,
    plugins: {
      "@typescript-eslint": tseslint.plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        warnOnUnsupportedTypeScriptVersion: true
      }
    },
    rules: Object.assign({}, tsRules)
  },
  /**
   * Utility to configure typescript-eslint parserOptions
   * @param {import("@typescript-eslint/parser").ParserOptions} parserOptions
   * @returns {import("typescript-eslint").ConfigArray[0]}
   */
  configureTS(parserOptions) {
    const hasProjectPath =
      typeof parserOptions.project == "string" ||
      typeof parserOptions.tsconfigRootDir == "string";

    if (!hasProjectPath) {
      throw new Error(
        "Must set either tsconfigRootDir or project with path in foxkit.configureTS"
      );
    }

    if (parserOptions.tsconfigRootDir && !parserOptions.project) {
      parserOptions.projectService ||= true;
    }

    return { files: tsFiles, languageOptions: { parserOptions } };
  },
  tsFiles
};
