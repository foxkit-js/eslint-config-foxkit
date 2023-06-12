const eslint = require("@eslint/js");

module.exports.baseRules = {
  ...eslint.configs.recommended.rules
};

module.exports.recommendedRules = {
  "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
  "no-undef": "error",
  "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
  "no-return-await": "warn",
  "no-await-in-promise/no-await-in-promise": "warn",
  "no-with": "error"
};
