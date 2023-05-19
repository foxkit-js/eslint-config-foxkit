import prettier from "eslint-config-prettier";
import foxkit from "./configs/index.js";

prettier;

export default [
  { ignores: ["dist/**"] },
  foxkit.configure({ strict: true }),
  prettier
];
