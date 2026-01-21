# @ilyasemenov/eslint-config

## 1.4.3

### Patch Changes

- 0af57de: Remove `eslint-plugin-annotation` (unmaintained and pulls outdated dependencies).

## 1.4.2

### Patch Changes

- d9f6871: Fix `component-name-in-template-casing` for Vue pug templates.

## 1.4.1

### Patch Changes

- 4134df6: Fix sorting of nested imports, group `package` and `package/nested` alongside and `package-other` after them. See <https://github.com/azat-io/eslint-plugin-perfectionist/issues/518>.

## 1.4.0

### Minor Changes

- 88c69ff: Update to @antfu/eslint-config 4, eslint-plugin-vue-pug 1.

## 1.3.0

### Minor Changes

- 865586a: Add `eslint-plugin-annotation`.

## 1.2.0

### Minor Changes

- b49f236: Add `vue/no-empty-component-block`.

## 1.1.0

### Minor Changes

- cb63e43: Upgrade to `@antfu/eslint-config` v3.12, use regexp for sort-imports internal patterns.

## 1.0.3

### Patch Changes

- 36c1075: Fix: prevent `@antfu/eslint-config` v3.10, as it upgrades `perfectionist` to v4 and breaks the pattern rules.

## 1.0.2

### Patch Changes

- 59fe1d7: Disable `antfu/consistent-chaining`.

## 1.0.1

### Patch Changes

- 8a70716: Add individual packages READMEs.

## 1.0.0

### Major Changes

- 6d52817: Initial release (decompose from @ilyasemenov/lint-config).
