# eslint-config-foxkit

This package contains an opinionated set of base configs for ESLint and [typescript-eslint].

## Installation

Install with your package manager of choice:

```bash
pnpm add --save-dev eslint-config-foxkit eslint@8.57.0 typescript
```

## Usage with Flat Configuration System

Add a [Flat Config] in your project like this:

```js
import foxkit from "eslint-config-foxkit/configs/base.js";

// This line is only required in ES Module projects:
const __dirname = new URL(".", import.meta.url).pathname.slice(0, -1);

export default [
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: __dirname })
];
```

You may also add other configs on top, such as [prettier], as well as your own overrides.

### Usage in CommonJS projects

If your project does not set `"type": "module"` in package.json your config will be CommonJS instead (unless explicitly named "eslint.config.mjs"). If this is the case use `require("eslint-config-foxkit/configs/base")` instead.

```js
const foxkit = require("eslint-config-foxkit/configs/base");

module.exports = [
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: __dirname })
];
```

### Usage with other base configurations

Alternatively you can access the rulesets by importing from `eslint-config-foxkit/rules`. If you are already using a base config like from your project's framework you may want to add a customized config object with our rules as well as the `no-await-in-promise` plugin like this:

```js
import framework from "@framework/eslint-config";
import * as promisePlugin from "eslint-plugin-no-await-in-promise";
import foxkit from "eslint-config-foxkit/configs/base.js";
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

**Note**: If you are using a framework such as Astro or Svelte you may want to push the extension to the config object (this change is synced with the output from `foxkitConfigureTS`):

```js
foxkit.typescript.files.push("**/*.astro");
```

## Usage with the Legacy Configuration System

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
foxkitOverrides.typescript.files.push("**/*.astro");

module.exports = {
  extends: ["foxkit"],
  overrides: [
    {
      files: ["**/*.ts?(x)", "**/*.astro"],
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
  "eslint.experimental.useFlatConfig": true
}
```

This enables the setting on a workspace-level, so when switching between projects the setting remains disabled for projects using the old config system. Also note that the `.mjs` and `.cjs` extensions may not get picked up correctly, so your config file should always be called `eslint.config.js`.

## Migrating from v3

- Install `eslint@8.57.0`
- Install `typescript@~5.5.0`
- `eslint-plugin-no-await-in-promise` as well as the [typescript-eslint] packages are now dependencies and can be removed from your own pkg json
- Use the documentation above to adjust your configuration. Base configs are now supplied as objects again, a utility function for setting up [typescript-eslint] is provided separately as `configureTS` now.
- The configs for React/Preact have not been updated, are marked as deprecated and will be removed in the next minor version!
- TypeScript configs are now included in the base imports (`"foxkit"` for legacy `extends`, `eslint-config-foxkit/configs/base.js` for flat configs). The separate legacy configuration still exists and will be removed in the next minor version!
- Astro support has been removed again. See instructions above for how to re-add support (or add support for any other framework such as Vue or Svelte).

[Flat Config]: (https://eslint.org/docs/latest/use/configure/configuration-files-new)
[typescript-eslint]: (https://typescript-eslint.io/)
[prettier]: (https://www.npmjs.com/package/eslint-config-prettier)
