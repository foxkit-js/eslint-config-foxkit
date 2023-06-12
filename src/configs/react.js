const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const { baseRules, recommendedRules, preactRules } = require("../rules/react");

module.exports = {
  /**
   * Configure React/Preact languageOptions and rules for all *.jsx and *.tsx files
   *
   * @param jsxRuntime Set to `true` when using jsx runtime
   * @param preact Set to `true` when using Preact
   * @param jsxA11y Set to `false` to disable jsx-a11y plugin rules
   * @param configOnly Set to `true` to disable adding non-vital rules
   */
  configure: function ({
    jsxRuntime = false,
    preact = false,
    jsxA11y = true,
    configOnly = false
  } = {}) {
    const configuredConfig = {
      files: ["**/*.jsx", "**/*.tsx"],
      plugins: {
        react: reactPlugin,
        "react-hooks": reactHooksPlugin
      },
      languageOptions: {
        jsx: true
      },
      rules: { ...baseRules }
    };

    if (!configOnly) {
      configuredConfig.rules = {
        ...configuredConfig.rules,
        ...recommendedRules
      };
    }

    if (jsxRuntime) {
      configuredConfig.rules = {
        ...configuredConfig.rules,
        ...reactPlugin.configs["jsx-runtime"].rules
      };
    }

    if (jsxA11y) {
      configuredConfig.plugins["jsx-a11y"] = jsxA11yPlugin;
      if (!configOnly) {
        configuredConfig.rules = {
          ...configuredConfig.rules,
          ...jsxA11yPlugin.configs.recommended.rules
        };
      }
    }

    // Settings
    if (preact) {
      configuredConfig.settings = {
        react: {
          pragma: "h",
          version: "16.0"
        }
      };
      configuredConfig.rules = {
        ...configuredConfig.rules,
        ...preactRules
      };
    } else {
      configuredConfig.settings = {
        react: {
          version: "detect"
        }
      };
    }

    return configuredConfig;
  }
};
