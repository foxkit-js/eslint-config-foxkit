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
  console.log("Building bundles");
  await esbuild.build({
    ...config,
    format: "cjs"
  });
  console.log("Copying README.md");
  await cp("./README.md", "dist/README.md", { force: true });
  console.log("Completed");
}

main();
