# @ilyasemenov/eslint-config

## 2.0.0

### Major Changes

- cf49545: Require ESLint 10.4 or later and update `@antfu/eslint-config` to v10.
- 46e1666: Require Node.js 22.13 or later.

### Minor Changes

- 2f862d2: Add `environment` option; with `"bun"`, Bun builtin modules such as `bun:test` are sorted together with Node.js builtin modules.
- 9525a53: Group re-exports like imports: packages, internal paths, parent paths and sibling paths, separated by blank lines.

### Patch Changes

- bc385a8: Publish only the build output, without source files and source maps.
- 84ba2b5: Sort `~icons/*` and other `~`-prefixed virtual modules together with packages instead of internal `~/` imports.
- f81a013: Enforce 1TBS brace style in Vue templates as in scripts, and allow single-line blocks such as `if (ok) { run() }`.

## 1.5.3

### Patch Changes

- af6a6cd: Unpin `eslint-plugin-vue`, update `eslint-plugin-vue-pug` to 1.0.0-alpha.6.

## 1.5.2

### Patch Changes

- 6c9651a: Pin to `@antfu/eslint-config@7.4` due to [upstream problem](https://github.com/antfu/eslint-config/issues/828).

## 1.5.1

### Patch Changes

- 3453033: Enable `console.log()` in documentation.
- a9932a0: Disable `jsonc/sort-array-values` for `package.json`, see [upstream issue](https://github.com/antfu/eslint-config/issues/763).

## 1.5.0

### Minor Changes

- 8dd945b: Update all deps. Update perfectionist v5 rules. Fix eslint-plugin-vue peer import.

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
