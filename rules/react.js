const reactPlugin = require("eslint-plugin-react");

module.exports.baseRules = {
  "react/jsx-key": "error",
  "react/jsx-no-undef": "error",
  "react/jsx-uses-react": "error",
  "react/jsx-uses-vars": "error",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn"
};

module.exports.recommendedRules = {
  ...reactPlugin.configs.recommended.rules,
  "react/prop-types": "off",
  "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }]
};

module.exports.preactRules = {
  "react/no-did-mount-set-state": "error",
  "react/no-did-update-set-state": "error",
  "react/no-find-dom-node": "error",
  "react/no-is-mounted": "error",
  "react/no-string-refs": "error"
};
