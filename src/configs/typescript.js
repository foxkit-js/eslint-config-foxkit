const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const tsRules = require("../rules/typescript.js");

const config = {
  files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx", "**/*.astro"],
  plugins: {
    "@typescript-eslint": tsPlugin
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: "module",
      warnOnUnsupportedTypeScriptVersion: true
    }
  }
};

module.exports = {
  /**
   * Configure TypeScript languageOptions, parser and rules. Either `project` or `tsconfigRootDir` must be set. `project` will be set `true` if `tsconfigRootDir` is passed.
   *
   * @param project parameter as per typescript-eslint docs
   * @param tsconfigRootDir parameter as per typescript-eslint docs
   * @returns
   */
  configure: function ({ project, tsconfigRootDir } = {}) {
    if (!project && !tsconfigRootDir) {
      throw new Error(
        "Must set either project or tsconfigRootDir in foxkitTS.configure"
      );
    }

    // deep clone
    const configuredConfig = Object.assign({}, config, {
      rules: Object.assign({}, tsRules),
      languageOptions: Object.assign({}, config.languageOptions, {
        parserOptions: Object.assign({}, config.languageOptions.parserOptions)
      })
    });

    if (tsconfigRootDir) {
      configuredConfig.languageOptions.parserOptions.project = true;
      configuredConfig.languageOptions.parserOptions.tsconfigRootDir =
        tsconfigRootDir;
    }

    if (project) {
      configuredConfig.languageOptions.parserOptions.project = project;
    }

    return configuredConfig;
  }
};
