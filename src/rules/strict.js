/**
 * Contains our strict ruleset helping achieve opinionated codestyle choices (was the default prior to v3.x)
 */
module.exports.strictRules = {
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
};
