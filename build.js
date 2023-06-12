import { rm, cp } from "fs/promises";
import * as esbuild from "esbuild";

const config = {
  entryPoints: ["configs/index.js", "configs/ts.js", "configs/react.js"],
  bundle: true,
  platform: "node",
  packages: "external",
  outdir: "dist",
  minify: false,
  target: "node16"
};

async function main() {
  console.log("Cleaning");
  await rm("dist", { recursive: true, force: true });
  console.log("Building esm bundles");
  await esbuild.build({
    ...config,
    format: "esm"
  });
  console.log("Building cjs bundles");
  await esbuild.build({
    ...config,
    format: "cjs",
    outExtension: { ".js": ".cjs" },
    footer: {
      // This is required because default exports are bad
      // @see https://github.com/evanw/esbuild/issues/1182#issuecomment-1011414271
      js: "module.exports = module.exports.default;"
    }
  });
  console.log("Copying README.md");
  await cp("./README.md", "dist/README.md", { force: true });
  console.log("Completed");
}

main();
