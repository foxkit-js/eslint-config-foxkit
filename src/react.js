const { baseRules, recommendedRules } = require("./rules/react");

/**
 * @deprecated
 */
const config = {
  plugins: ["react", "react-hooks", "jsx-a11y"],
  extends: ["plugin:jsx-a11y/recommended"],
  rules: Object.assign({}, baseRules, recommendedRules),
  overrides: [
    {
      files: ["**/*.jsx", "**/*.tsx", "**/*.astro"],
      env: { browser: true },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
};

if (process.env.npm_package_type === "module") {
  config.overrides.push({
    files: ["**/*.jsx"],
    parserOptions: {
      sourceType: "module"
    }
  });
}

module.exports = config;
