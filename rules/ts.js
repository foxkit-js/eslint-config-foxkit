import tsPlugin from "@typescript-eslint/eslint-plugin";

const [eslintRecommended] = tsPlugin.configs["eslint-recommended"].overrides;
const tsRecommended = tsPlugin.configs.recommended;

export const baseRules = {
  ...eslintRecommended.rules
};
export const recommendedRules = {
  ...tsRecommended.rules,
  "prefer-const": "warn", // warn is good enough
  "@typescript-eslint/ban-ts-comment": "off", // just no, refuse
  "@typescript-eslint/ban-types": "off", // this bans `{}` and says to use `object` instead. `object` incorrectly used Set, Map and such
  "@typescript-eslint/no-non-null-assertion": "off", // is simply needed at times with types from external libs
  "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }] // Funfact: the ignore pattern doesn't always work on function params
};
