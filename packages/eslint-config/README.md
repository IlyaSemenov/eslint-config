# @ilyasemenov/eslint-config

This is a reusable ESLint config that I use in the projects that I develop or supervise.

Extends [@antfu/eslint-config](https://github.com/antfu/eslint-config).

Could be used together with Stylelint config, see [IlyaSemenov/lint-config](https://github.com/IlyaSemenov/lint-config).

## Setup

Install:

```sh
pnpm add -D eslint @ilyasemenov/eslint-config
```

Create `eslint.config.js`:

```js
// @ts-check

import { defineConfig } from "@ilyasemenov/eslint-config"

export default defineConfig()
```

Available options:

```js
export default defineConfig({
  // Lint Vue. Unlike antfu, must be enabled explicitly.
  vue: true,

  // Lint pug in Vue templates.
  vuePug: true,

  // ...and all @antfu/eslint-config options.
})
```

## Command line script

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint --fix"
  }
}
```

and run:

```sh
pnpm lint
```

## Setup lint-staged

Create `lint-staged.config.js`:

```js
export default {
  "*.{cjs,js,ts,json,md,yaml,toml}": "eslint --fix"
}
```
