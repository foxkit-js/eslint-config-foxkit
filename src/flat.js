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
   */
  configureTS({ project, tsconfigRootDir } = {}) {
    const parserOptions = {};
    if (!project && !tsconfigRootDir) {
      throw new Error(
        "Must set either project or tsconfigRootDir property in foxkit.configureTS"
      );
    }

    if (tsconfigRootDir) {
      parserOptions.projectService = true;
      parserOptions.tsconfigRootDir = tsconfigRootDir;
    }

    if (project) parserOptions.project = project;

    return { files: tsFiles, languageOptions: { parserOptions } };
  },
  tsFiles
};
