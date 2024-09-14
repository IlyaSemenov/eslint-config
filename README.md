# @ilyasemenov/lint-config

A set of reusable linter configs that I use in the projects that I develop or supervise:

- for `eslint`, extends [@antfu/eslint-config](https://github.com/antfu/eslint-config).
- for `stylelint`

## Install

```sh
pnpm add -D @ilyasemenov/lint-config
```

## Setup eslint

Create `eslint.config.js`:

```js
import { defineEslintConfig } from "@ilyasemenov/lint-config"

export default defineEslintConfig()
```

Available options:

```js
export default defineEslintConfig({
  // Lint Vue. Unlike antfu, must be enabled explicitly.
  vue: true,
  // Lint pug in Vue templates.
  vuePug: true,
})
```

## Setup stylelint

Create `stylelint.config.js`:

```js
import { defineStylelintConfig } from "@ilyasemenov/lint-config"

export default defineStylelintConfig()
```

## Setup lint-staged

Create `lint-staged.config.js`:

```js
export default {
  "*.{cjs,js,ts,json,md,yaml,toml}": "eslint --fix",
  "*.{css,scss}": "stylelint --fix",
  "*.vue": ["eslint --fix", "stylelint --fix"],
}
```
