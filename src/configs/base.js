const promisePlugin = require("eslint-plugin-no-await-in-promise");
const globals = require("globals");
const { baseRules, recommendedRules } = require("../rules/base.js");
const { strictRules } = require("../rules/strict.js");

module.exports = {
  /**
   * Configure JavaScript languageOptions, globals and rules.
   *
   * @param strict Set to `true` include the strict ruleset
   * @param setGlobals Set to `false` to disable setting globals (nodeBuiltin + browser) so you can configure them yourself
   * @param ecmaVersion override the ecmaVersion parameter (default: 2022)
   * @param configOnly Only configure languageOptions and include eslint's recommended ruleset. Does NOT configure the no-await-in-promise plugin!
   */
  configure: function ({
    strict = false,
    setGlobals = true,
    ecmaVersion = 2022,
    configOnly = false
  } = {}) {
    const configuredConfig = {
      languageOptions: {
        ecmaVersion
      },
      rules: Object.assign({}, baseRules, recommendedRules)
    };

    if (setGlobals) {
      configuredConfig.languageOptions.globals = Object.assign(
        {},
        globals.nodeBuiltin,
        globals.browser
      );
    }

    if (configOnly) {
      configuredConfig.rules = baseRules;
      return configuredConfig;
    }

    configuredConfig.plugins = {
      "no-await-in-promise": promisePlugin
    };

    if (strict) {
      Object.assign(configuredConfig.rules, strictRules);
    }

    return configuredConfig;
  }
};
