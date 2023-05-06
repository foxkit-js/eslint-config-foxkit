import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import base from "./rules/ts.js";

const config = {
  files: ["**/*.ts", "**/*.mts", "**/*.cts", "**/*.tsx"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      sourceType: "module",
      warnOnUnsupportedTypeScriptVersion: true
    }
  },
  plugins: {
    "@typescript-eslint": tsPlugin
  }
};

export default {
  recommended: {
    ...config,
    ...base
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
  // TODO: ,strict
};
