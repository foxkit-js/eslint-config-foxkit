const baseConfig = require("./index");
const { strictRules } = require("./rules/strict");

module.exports = Object.assign({}, baseConfig, {
  rules: Object.assign({}, baseConfig.rules, strictRules)
});
