import tsPlugin from "@typescript-eslint/eslint-plugin";

const [eslintRecommended] = tsPlugin.configs["eslint-recommended"].overrides;
const tsRecommended = tsPlugin.configs.recommended;

export default {
  rules: {
    ...eslintRecommended.rules,
    ...tsRecommended.rules,
    "prefer-const": "warn"
  }
};
