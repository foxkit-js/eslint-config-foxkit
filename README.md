# eslint-config-foxkit

This package contains an opinionated set of configs for ESLint Flat Configuration setups.

## Installation

Install with your package manager of choice:

```bash
pnpm add --save-dev eslint eslint-config-foxkit eslint-plugin-no-await-in-promise
```

## Usage

Add a [Flat Config] in your project like this:

```js
import foxkit from "eslint-config-foxkit";

export default [foxkit.configure()];
```

You may also add other configs on top, such as [prettier], as well as your own overrides.

**Note:** If your project does not set `"type": "module"` in package.json your config will be CommonJS instead (unless explicitly named "eslint.config.mjs"). If this is the case use `require("eslint-config-foxkit")` instead. All exports of this package are dual-published with esbuild.

```js
const foxkit = require("eslint-config-foxkit");

module.exports = [foxkit.configure()];
```

### Options

Options are passed as an object like `foxkit.configure({ strict: true })`.

- `strict` Set to `true` include the strict ruleset which helps achieve opinionated codestyle choices (was the default prior to v3.x)
- `setGlobals` Set to `false` to disable setting globals (nodeBuiltin + browser) so you can configure them yourself
- `ecmaVersion` override the ecmaVersion parameter (default: 2022)
- `configOnly` Only configure languageOptions and include eslint's recommended ruleset. Does NOT configure the no-await-in-promise plugin!

### Usage with other base configs

Alternatively you can access the rulesets in the `foxkit.rules` object. If you are already using a base config like from your project's framework you may want to add a customized config object with our rules as well as the `no-await-in-promise` plugin like this:

```js
import framework from "@framework/eslint-config";
import foxkit from "eslint-config-foxkit";
import * as promisePlugin from "eslint-plugin-no-await-in-promise";

export default [
  framework,
  {
    plugins: {
      "no-await-in-promise": promisePlugin
    },
    rules: {
      ...foxkit.rules.recommended,
      ...foxkit.rules.strict
    }
  }
];
```

## Usage with TypeScript

Set up JavaScript base configs as seen above and then install the following peerDependencies with your package manager of choice:

```bash
pnpm add --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Now add `foxkitTS` to your ESLint config like this:

```js
import foxkit from "eslint-config-foxkit";
import foxkitTS from "eslint-config-foxkit/typescript";

// This line is only required in ES Module projects:
const __dirname = new URL(".", import.meta.url).pathname.slice(0, -1);

export default [
  foxkit.configure({
    /* any options here */
  }),
  foxkitTS.configure({
    tsconfigRootDir: __dirname
    /* any other options here */
  })
];
```

### Options

- `project`: parameter as per [typescript-eslint] docs
- `tsconfigRootDir`: parameter as per [typescript-eslint] docs
- `strict`: Set to `true` to include strict ruleset (contains rules that require typechecking and some opinionated rule choices)
- `configOnly`: Set to `true` to only set up [typescript-eslint] (includes overrides for eslint's recommended rules that are handled by TypeScript)

Alternatively you can access the rulesets in the `foxkitTS.rules` object. Note that you will need to configure the parserOptions to use the strict ruleset.

## Usage with React/Preact

Set up JavaScript base configs (and optionally TypeScript configs) as seen above and then install the following peerDependencies with your package manager of choice:

```bash
pnpm add --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

Now add `foxkitReact` to your ESLint config like this:

```js
import foxkit from "eslint-config-foxkit";
import foxkitReact from "eslint-config-foxkit/react";

export default [
  foxkit.configure({
    /* any options here */
  }),
  foxkitReact.configure({
    /* any options here */
  })
];
```

### Options

- `jsxRuntime` Set to `true` when using jsx runtime
- `preact` Set to `true` when using Preact
- `jsxA11y` Set to `false` to disable jsx-a11y plugin rules
- `configOnly` Set to `true` to disable adding non-vital rules. This option does not prevent adding the rules for Preact and the jsx runtime. While the jsx-a11y plugin will still be added to the config, no rules will be added.

Alternatively you can access the rulesets in the `foxkitTS.rules` object. Note that you will need to configure the plugins manually.

## Note for VSCode

As of right now the [ESLint plugin available for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) has experimental support for [Flat Config] hidden behind a setting. In your project simply create a `.vscode` directory with a `settings.json` file with the following content (or add to it if you already have one):

```json
{
  "eslint.experimental.useFlatConfig": true
}
```

This enables the setting on a workspace-level, so when switching between projects the setting remains disabled for projects using the old config system. Also note that the `.mjs` and `.cjs` extensions may not get picked up correctly, so your config file should always be called `eslint.config.js`.

## Migrating from v2

- Upgrade to at least `eslint@8.40.0`
- Install `eslint-plugin-no-await-in-promise` or auto-install peerDeps
- Convert your `.eslintrc.js` to a [Flat Config] using strict rulesets enabled (these were previously the default)
- ignore paths are no longer set by default, add your own in a config object containing the "ignores" key (array of paths to ignore). Example: `{ ignores: ["dist/**"] }`
- See Section above about VSCode extension settings
- Don't forget to add the config for [prettier] as the final element of your config array

[Flat Config]: (https://eslint.org/docs/latest/use/configure/configuration-files-new)
[typescript-eslint]: (https://typescript-eslint.io/)
[prettier]: (https://www.npmjs.com/package/eslint-config-prettier)
