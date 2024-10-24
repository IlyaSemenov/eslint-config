# @ilyasemenov/lint-config

## 1.2.1

### Patch Changes

- 35bb116:
  - Allow `style="color: red"`
  - Allow `clip-path: polygon(<multiline code>)`
  - Don't convert `#0033ff` to `#03f`
  - Allow mixed-case mixin functions such as `findInvertColor`

## 1.2.0

### Minor Changes

- a7daee5: Stylelint options for tabs and single quotes.
- 6116f75: Disable antfu/top-level-function.
- d68564c: Accept stylelint config options.
- 3989403: Accept all antfu eslint options.

### Patch Changes

- 867ac00: Normalize internal import patterns, support `~foo` aliases.
- 3f067aa: Force spaces for `package.json` indentation.

## 1.1.1

### Patch Changes

- d19db0e: Disable vue/component-name-in-template-casing again, it breaks pug templates on autofix.

## 1.1.0

### Minor Changes

- 20ee6cb: Enable component-name-in-template-casing for pug.

## 1.0.0

### Major Changes

- fec97e0: Initial release.
