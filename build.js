import { rm } from "fs/promises";
import * as esbuild from "esbuild";

const config = {
  entryPoints: ["configs/index.js", "configs/ts.js", "configs/react.js"],
  bundle: true,
  platform: "node",
  packages: "external",
  outdir: "dist",
  minify: false
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
    outExtension: { ".js": ".cjs" }
  });
  console.log("Completed");
}

main();
