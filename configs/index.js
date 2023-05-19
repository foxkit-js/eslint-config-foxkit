import * as promisePlugin from "eslint-plugin-no-await-in-promise";
import globals from "globals";
import { baseRules, recommendedRules } from "../rules/base.js";
import { strictRules } from "../rules/strict.js";

export default {
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
      }
    };

    if (setGlobals) {
      configuredConfig.languageOptions.globals = {
        ...globals.nodeBuiltin,
        ...globals.browser
      };
    }

    if (configOnly) {
      configuredConfig.rules = baseRules;
      return configuredConfig;
    }

    configuredConfig.plugins = {
      "no-await-in-promise": promisePlugin
    };

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
     * Contains eslint's recommended rules from the `@eslint/js` package
     */
    base: baseRules,
    /**
     * Contains our recommended ruleset to avoid errors as well as the no-await-in-promise plugin
     */
    recommended: recommendedRules,
    /**
     * Contains our strict ruleset helping achieve opinionated codestyle choices (was the default prior to v3.x)
     */
    strict: strictRules
  }
};
