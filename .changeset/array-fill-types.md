---
"@ilyasemenov/eslint-config": patch
---

Fix `--fix` breaking TypeScript types by rewriting `Array.from({ length }, () => value)` into `Array.from({ length }).fill(value)`.
