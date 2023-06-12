const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const { baseRules, recommendedRules } = require("../rules/ts.js");
const { strictRules } = require("../rules/ts-strict.js");

const config = {
  files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx"],
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
   * @param strict Set to `true` to include strict ruleset
   * @param configOnly Set to `true` to only set up typescript-eslint (includes overrides for eslint's recommended rules that are handled by TypeScript)
   * @returns
   */
  configure: function ({
    project,
    tsconfigRootDir,
    strict = false,
    configOnly = false
  } = {}) {
    if (!project && !tsconfigRootDir) {
      throw new Error(
        "Must set either project or tsconfigRootDir in foxkitTS.configure"
      );
    }

    const configuredConfig = {
      ...config,
      languageOptions: {
        ...config.languageOptions,
        parserOptions: {
          ...config.languageOptions.parserOptions
        }
      }
    };

    if (project) {
      configuredConfig.languageOptions.parserOptions.project = project;
    }

    if (tsconfigRootDir) {
      configuredConfig.languageOptions.parserOptions.project = true;
      configuredConfig.languageOptions.parserOptions.tsconfigRootDir =
        tsconfigRootDir;
    }

    if (configOnly) {
      configuredConfig.rules = baseRules;
      return configuredConfig;
    }

    if (strict) {
      configuredConfig.rules = {
        ...baseRules,
        ...recommendedRules
      };
    } else {
      configuredConfig.rules = {
        ...baseRules,
        ...recommendedRules,
        ...strictRules
      };
    }

    return configuredConfig;
  },
  rules: {
    /**
     * Contains typescript-eslint's overrides for eslint's recommended rules that are already handled by TypeScript
     */
    base: baseRules,
    /**
     * Contains slightly modified version of typescript-eslint's recommended ruleset
     */
    recommended: recommendedRules,
    /**
     * Contains strict ruleset, which contains some rules with typechecking! See typescript-eslint's docs for more Information.
     */
    strict: strictRules
  }
};
