const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const { baseRules, recommendedRules } = require("../rules/typescript.js");
const { strictRules } = require("../rules/typescript-strict.js");

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

    // deep clone
    const configuredConfig = Object.assign({}, config, {
      rules: Object.assign({}, baseRules),
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

    if (configOnly) return configuredConfig;

    Object.assign(configuredConfig.rules, recommendedRules);

    if (strict) {
      Object.assign(configuredConfig.rules, strictRules);
    }

    return configuredConfig;
  }
};
