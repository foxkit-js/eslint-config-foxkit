import globals from "globals";
import baseRules from "./rules/base.js";
import strictRules from "./rules/strict.js";

const config = {
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      ...globals.nodeBuiltin,
      ...globals.browser
    }
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
