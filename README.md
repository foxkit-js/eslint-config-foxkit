# eslint-config-foxkit

This package contains an opinionated set of configs for ESLint Flat Configuration setups.

## Installation

Install with your package manager of choice:

```bash
pnpm add --save-dev eslint eslint-config-foxkit eslint-plugin-no-await-in-promise
```

## Usage (JavaScript Base Configs)

Add a [Flat Config] in your project like this:

```js
import foxkit from "eslint-config-foxkit";

export default [foxkit.recommended];
```

You may also add other configs on top, such as the one for any frameworks you may be using or [prettier], as well as your own overrides.

**Note:** If your project does not set `"type": "module"` in package.json your config will be CommonJS instead (unless explicitly named "eslint.config.mjs"). If this is the case use `require("eslint-config-foxkit")` instead. All exports of this package are dual-published with esbuild.

```js
const foxkit = require("eslint-config-foxkit");

module.exports = [foxkit.recommended];
```

### Configs

Currently there are two base configurations available:

- `foxkit.recommended` extends the recommendations by ESLint with very few changes (such as enabling `no-undef` and adding eslint-plugin-no-await-in-promise).
- `foxkit.strict` further extends `foxkit.recommended` (read: you only need one of the two in your config) with various other stylistic rules to encourage cleaner code and usage of newer syntax.

## Usage with TypeScript

Set up either JavaScript base config as seen above and then install the following peerDependencies with your package manager of choice:

```bash
pnpm add --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Now add `foxkitTS` to your ESLint config like this:

```js
import foxkit from "eslint-config-foxkit";
import foxkitTS from "eslint-config-foxkit/typescript";

// This line is only required in ES Module projects:
const __dirname = new URL(".", import.meta.url).pathname;

export default [
  foxkit.strict, // or foxkit.recommended
  foxkitTS.configure({ tsconfigRootPath: __dirname })
];
```

### Options

- `project`: parameter as per [typescript-eslint] docs
- `tsconfigRootPath`: parameter as per [typescript-eslint] docs
- `strict`: Set to `true` to include strict ruleset (contains rules that require typechecking and some opinionated rule choices)
- `configOnly`: Set to `true` to only set up [typescript-eslint] (includes overrides for eslint's recommended rules that are handled by TypeScript)

Alternatively you can access the rulesets in the `foxkitTS.rules` object. Note that you will need to configure the parserOptions to use the strict ruleset.

## Usage with React

**TBD**

### Preact

**TBD**

## Full examples

**TBD**

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
- Convert your `.eslintrc.js` to a [Flat Config] using `foxkit.strict` (and `foxkitTS.strict` as applicable)
- ignore paths are no longer set by default, add your own in a config object containing the "ignores" key (array of paths to ignore). Example: `{ ignores: ["dist/**"] }`
- See Section above about VSCode extension settings
- **TEMP**: If needed setup up `eslint-plugin-react` as per their docs with the following rules:

```js
{
  ...react.configs.recommended.rules,
  "react/react-in-jsx-scope": "off", // for jsx-runtime
  "react/jsx-uses-react": "off", // for jsx-runtime
  "react/prop-types": "off",
  "react/jsx-filename-extension": ["error", { extensions: [".jsx" ,".tsx"] }]
}
```

- Support for React is not yet migrated and will be included as `"eslint-plugin-foxkit/react"` in the future
- Support for Preact is not yet migrated and will be included as `"eslint-plugin-foxkit/preact"` in the future
- Don't forget to add the config for [prettier] as the final element of your config array

[Flat Config]: (https://eslint.org/docs/latest/use/configure/configuration-files-new)
[typescript-eslint]: (https://typescript-eslint.io/)
[prettier]: (https://www.npmjs.com/package/eslint-config-prettier)
