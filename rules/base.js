import js from "@eslint/js";
import * as promisePlugin from "eslint-plugin-no-await-in-promise";

export default {
  plugins: {
    "no-await-in-promise": promisePlugin
  },
  rules: {
    ...js.recommended.rules,
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_+" }],
    "no-undef": "error",
    "no-fallthrough": ["error", { commentPattern: "break[\\s\\w]*omitted" }],
    "no-return-await": "warn",
    "no-await-in-promise/no-await-in-promise": "warn"
  }
};
