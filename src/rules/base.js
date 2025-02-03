const eslint = require("@eslint/js");

/**
 * Base Ruleset for JavaScript Development (also contains eslint's recommended
 * rules from the `@eslint/js` package)
 * @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.Rules}
 */
module.exports = Object.assign({}, eslint.configs.recommended.rules, {
  "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
  "no-undef": "error",
  "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
  "no-return-await": "warn",
  "no-await-in-promise/no-await-in-promise": "warn",
  "no-with": "error",
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
});
