const eslint = require("@eslint/js");

/**
 * Contains eslint's recommended rules from the `@eslint/js` package
 */
module.exports.baseRules = {
  ...eslint.configs.recommended.rules
};

/**
 * Contains our recommended ruleset to avoid errors as well as the no-await-in-promise plugin
 */
module.exports.recommendedRules = {
  "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
  "no-undef": "error",
  "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
  "no-return-await": "warn",
  "no-await-in-promise/no-await-in-promise": "warn",
  "no-with": "error"
};
