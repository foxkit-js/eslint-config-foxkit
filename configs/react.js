import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import { baseRules, recommendedRules, preactRules } from "../rules/react";

export default {
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
  },
  rules: {
    /**
     * Base ruleset required to make JSX and hooks work with ESLint
     */
    base: baseRules,
    /**
     * Our recommended ruleset based on the recommended rulesets by the react plugin
     */
    recommended: recommendedRules,
    /**
     * Ruleset for usage with the jsx runtime
     */
    jsxRuntime: reactPlugin.configs["jsx-runtime"].rules,
    /**
     * Compatibility ruleset for usage with Preact
     */
    preact: preactRules,
    /**
     * Recommended ruleset from the jsx-a11y plugin
     */
    jsxA11y: jsxA11yPlugin.configs.recommended.rules
  }
};
