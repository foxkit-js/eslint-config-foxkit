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

Now add `foxkitTS from "eslint-config-foxkit/typescript"` to your ESLint config like this:

```js
import foxkit from "eslint-config-foxkit";
import foxkitTS from "eslint-config-foxkit/typescript";

export default [
  foxkit.strict, // or foxkit.recommended
  foxkitTS.recommended
];
```

### Configs

Similary to the base configs the TypeScript addon config comes in two varieties:

- `foxkitTS.recommended` sets up the [typescript-eslint] parser and plugin and enables their recommendations with few overrides
- `foxkitTS.strict` further extends `foxkitTS.recommended` (read: like above, you only need one of the two in your config) with rules to encourage typesafe and clean code, as well as using type imports/exports wherever possible to reduce bundle size in frameworks such as Next.js which blindly bundle unused imports.

### `foxkitTS.strict` setup step

The strict config uses rules that use typechecking during the lint step. This requires a setup function:

```js
import foxkit from "eslint-config-foxkit";
import foxkitTS from "eslint-config-foxkit/typescript";

const __dirname = new URL(".", import.meta.url).pathname;

export default [
  foxkit.strict, // or foxkit.recommended
  foxkitTS.configureRoot(__dirname)
  foxkitTS.strict
]
```

Alternatively you may use `foxkitTS.configureProject` if you know what you are doing and prefer this method.

## Usage with React

**TBD**

### Preact

**TBD**

## Full examples

**TBD**

## Migrating from v2

- Upgrade to at least `eslint@8.40.0`
- Install `eslint-plugin-no-await-in-promise` or auto-install peerDeps
- Convert your `.eslintrc.js` to a [Flat Config] using `foxkit.strict` (and `foxkitTS.strict` as applicable)
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
