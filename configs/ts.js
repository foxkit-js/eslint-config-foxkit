import tsParser from "@typescript-eslint/parser";
import base from "../rules/ts.js";
import strict from "../rules/ts-strict.js";

const config = {
  files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: "module",
      warnOnUnsupportedTypeScriptVersion: true
    }
  }
};

export default {
  recommended: {
    ...config,
    ...base
  },
  strict: {
    ...config,
    ...strict
  },
  configureRoot(root) {
    return {
      files: config.files,
      languageOptions: {
        parserOptions: {
          project: true,
          tsconfigRootDir: root
        }
      }
    };
  },
  configureProject(project) {
    return {
      files: config.files,
      languageOptions: {
        parserOptions: { project }
      }
    };
  }
};
