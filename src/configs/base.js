const promisePlugin = require("eslint-plugin-no-await-in-promise");
const globals = require("globals");
const baseRules = require("../rules/base.js");

module.exports = {
  /**
   * Configure JavaScript languageOptions, globals and rules.
   *
   * @param setGlobals Set to `false` to disable setting globals (node + browser) so you can configure them yourself
   * @param ecmaVersion override the ecmaVersion parameter (default: 2023)
   */
  configure: function ({ setGlobals = true, ecmaVersion = 2023 } = {}) {
    const configuredConfig = {
      languageOptions: {
        ecmaVersion
      },
      rules: Object.assign({}, baseRules),
      plugins: {
        "no-await-in-promise": promisePlugin
      }
    };

    if (setGlobals) {
      configuredConfig.languageOptions.globals = Object.assign(
        {},
        globals.nodeBuiltin,
        globals.node,
        globals.browser
      );
    }

    return configuredConfig;
  }
};
