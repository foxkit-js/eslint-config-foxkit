import { relative, join } from "path";
import { rm, cp, readdir } from "fs/promises";
import * as esbuild from "esbuild";

const config = {
  bundle: false,
  platform: "node",
  packages: "external",
  outdir: "dist",
  minify: false,
  target: "node16"
};

const __dirname = new URL(".", import.meta.url).pathname.slice(0, -1);

async function discoverDirectory(dirPath) {
  const dir = await readdir(dirPath);
  return dir
    .filter(str => str.endsWith(".js"))
    .map(file => relative(__dirname, join(dirPath, file)));
}

async function main() {
  console.log("Cleaning");
  await rm("dist", { recursive: true, force: true });

  console.log("Discovering source files");
  const dirs = await Promise.all([
    discoverDirectory("src"),
    discoverDirectory("src/configs"),
    discoverDirectory("src/rules")
  ]);
  const entryPoints = dirs.flat();

  console.log("Building bundles");
  await esbuild.build({
    ...config,
    entryPoints,
    format: "cjs"
  });

  console.log("Copying README.md");
  await cp("./README.md", "dist/README.md", { force: true });
  console.log("Completed");
}

main();
