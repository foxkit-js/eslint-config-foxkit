import js from "@eslint/js";

export const baseRules = {
  ...js.configs.recommended.rules
};

export const recommendedRules = {
  "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
  "no-undef": "error",
  "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
  "no-return-await": "warn",
  "no-await-in-promise/no-await-in-promise": "warn",
  "no-with": "error"
};
