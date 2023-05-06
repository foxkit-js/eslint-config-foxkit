import base from "./base.js";

export default {
  ...base,
  rules: {
    ...base.rules,
    "prefer-const": "warn",
    "no-alert": "error",
    "no-else-return": "warn",
    "no-use-before-define": ["error", { variables: true }],
    "prefer-template": "warn",
    "operator-assignment": ["warn", "always"],
    "logical-assignment-operators": [
      "warn",
      "always",
      { enforceForIfStatements: true }
    ]
  }
};
