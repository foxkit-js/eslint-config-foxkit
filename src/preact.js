const reactConfig = require("./react");

module.exports = Object.assign({}, reactConfig, {
  settings: {
    react: {
      pragma: "h",
      version: "16.0"
    }
  }
});
