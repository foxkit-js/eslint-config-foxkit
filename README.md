# eslint-config-foxkit

This package contains an opinionated set of base configs for ESLint and [typescript-eslint].

## Installation

Install with your package manager of choice:

```bash
pnpm add --save-dev eslint-config-foxkit eslint @eslint/js typescript@~5.7
```

**Note**: To use ESLint v8 please install `eslint@8.57.0 @eslint/js@8.57.1`. Support for v8 will be dropped in the future when required for updating any dependencies of this configuration package.

## Usage with Flat Configuration System

Add a [Flat Config] in your project like this:

```js
import foxkit from "eslint-config-foxkit/flat.js";

export default [
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: import.meta.dirname })
];
```

You may also add other configs on top, such as [prettier], as well as your own overrides.

### Usage in CommonJS projects

If your project does not set `"type": "module"` in package.json your config will be CommonJS instead (unless explicitly named `"eslint.config.mjs"`). If this is the case use `require("eslint-config-foxkit/flat")` instead.

```js
const foxkit = require("eslint-config-foxkit/flat");

module.exports = [
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: __dirname })
];
```

### Extending base configs

You can use `tsEslint.config` to extend the base configs, for example to add the file extensions for a framework like Astro:

```js
import foxkit from "eslint-config-foxkit/flat.js";
import tsEslint from "typescript-eslint";

const foxkitTS = tsEslint.config({
  files: foxkit.tsFiles.concat("**/*.astro"),
  extends: [
    foxkit.typescript,
    foxkit.configureTS({
      tsconfigRootDir: import.meta.dirname,
      extraFileExtensions: [".astro"]
    })
  ]
});

export default [
  foxkit.base,
  // spread is required here as tsEslint.config returns an array!
  ...foxkitTS
];
```

### Usage with other base configurations

Alternatively you can access the rulesets by importing from `eslint-config-foxkit/rules`. If you are already using a base config like from your project's framework you may want to add a customized config object with our rules as well as the `no-await-in-promise` plugin like this:

```js
import framework from "@framework/eslint-config";
import * as promisePlugin from "eslint-plugin-no-await-in-promise";
import foxkit from "eslint-config-foxkit/flat.js";
import foxkitRules from "eslint-config-foxkit/rules/base.js";

// This line is only required in ES Module projects:
const __dirname = new URL(".", import.meta.url).pathname.slice(0, -1);

export default [
  framework,
  {
    plugins: { "no-await-in-promise": promisePlugin },
    rules: { ...foxkitRules }
  },
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: __dirname })
];
```

## Usage with the Legacy Configuration System

**Note**: The [Legacy Config] System will be removed in ESLint v10. Support it will be dropped when ESLint v8 is no longer supported!

Simply add `"foxkit"` to your extends array in your `.eslintrc.cjs` file and set up the parserOptions for [typescript-eslint]:

```js
module.exports = {
  extends: ["foxkit"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    }
  ]
};
```

**Note**: Should you need to add a file extension to the typescript override you can import it directly:

```js
const foxkitOverrides = require("eslint-config-foxkit/legacy/overrides");
const foxkitTS = foxkitOverrides.typescript;
foxkitTS.files.push("**/*.astro");

module.exports = {
  extends: ["foxkit"],
  overrides: [
    {
      files: foxkitTS.files,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    },
    foxkitOverrides.typescript // re-insert patched version of the override
  ]
};
```

## Note for VSCode

As of right now the [ESLint plugin available for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) has experimental support for [Flat Config] hidden behind a setting. In your project simply create a `.vscode` directory with a `settings.json` file with the following content (or add to it if you already have one):

```json
{
  "eslint.useFlatConfig": true
}
```

This enables the setting on a workspace-level, so when switching between projects the setting remains disabled for projects using the old config system. Also note that the `.mjs` and `.cjs` extensions may not get picked up correctly, so your config file should always be called `eslint.config.js`.

## Note for pnpm

As of pnpm v10 there are issues with accessing subdependencies, such as `typescript-eslint` (a dependency of this config package). If you are experiencing problems with ESLint or TypeScript being unable to find subdependencies try adding the following options to your `.npmrc` file:

```ini
auto-install-peers=true
node-linker=hoisted
```

## See also

- [eslint-config-foxkit-react]: Our base configurations for React/Preact development

## Migrating from v4

- The import path for [Flat Config]s has changed to `"eslint-config-foxkit/flat.js"`
- TypeScript-ESLint dependency has been changed to the `typescript-eslint` package, as such a cleaner way to extend base configs is now available (see [Extending base configs](#extending-base-configs))

## Migrating from v3

- Install `eslint@8.57.0` or `eslint@^9` and matching version of `@eslint/js`
- Install `typescript@~5.7`
- `eslint-plugin-no-await-in-promise` as well as the [typescript-eslint] packages are now dependencies and can be removed from your own `package.json`
- Use the documentation above to adjust your configuration. Base configs are now supplied as objects again, a utility function for setting up [typescript-eslint] is provided separately as `configureTS` now.
- Non-strict configurations have been removed and are no longer available.
- The configs for React/Preact have moved to [eslint-config-foxkit-react] which must be set up separately now.
- TypeScript configs are now included in the base imports (`"foxkit"` for legacy `extends`, `eslint-config-foxkit/flat.js` for flat configs).
- Astro support has been removed again. See instructions above for how to re-add support (or add support for any other framework such as Vue or Svelte).

[Flat Config]: (https://eslint.org/docs/latest/use/configure/configuration-files-new)
[Legacy Config]: (https://eslint.org/docs/latest/use/configure/configuration-files-deprecated)
[typescript-eslint]: (https://typescript-eslint.io/)
[prettier]: (https://www.npmjs.com/package/eslint-config-prettier)
[eslint-config-foxkit-react]: (https://github.com/foxkit-js/eslint-config-foxkit-react)
