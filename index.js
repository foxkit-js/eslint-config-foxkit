import baseRules from "./rules/base.js";
import strictRules from "./rules/strict.js";

const config = {
  languageOptions: {
    ecmaVersion: 2022
  }
};

export default {
  recommended: {
    ...baseRules,
    ...config
  },
  strict: {
    ...strictRules,
    ...config
  }
};
