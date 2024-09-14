import { antfu, interopDefault } from "@antfu/eslint-config"
import type { Linter } from "eslint"

export interface EslintOptions {
  vue?: boolean
  vuePug?: boolean
}

// Workaround for error TS2742:
// The inferred type of 'defineEslintConfig' cannot be named without a reference to '.pnpm/eslint-flat-config-utils@0.3.1/node_modules/eslint-flat-config-utils'.
// This is likely not portable. A type annotation is necessary.
export type FlatConfigComposer = ReturnType<typeof antfu>

export function defineEslintConfig(opts?: EslintOptions): FlatConfigComposer {
  const fullOpts = {
    vue: false,
    vuePug: false,
    ...opts,
  }

  if (!fullOpts.vue && fullOpts.vuePug) {
    throw new Error(`"vuePug" option requires "vue" option to be enabled.`)
  }

  const composer = antfu({
    vue: fullOpts.vue,
    stylistic: {
      quotes: "double",
    },
    rules: {
      // always add if { ... } braces
      "curly": ["error", "all"],
      // allow console.log
      "no-console": "warn",
      // allow arrays [, a]
      "no-sparse-arrays": "off",
      // allow string + string
      "prefer-template": "off",
      "perfectionist/sort-imports": ["error", {
        groups: [
          ["builtin", "builtin-type", "external", "external-type"],
          ["internal", "internal-type"],
          ["parent", "parent-type"],
          ["sibling", "sibling-type", "index", "index-type"],
          "unknown",
        ],
        newlinesBetween: "always",
        order: "asc",
        type: "natural",
      }],
      // put if { at one line
      "style/brace-style": ["error", "1tbs"],
      // allow both it() and test()
      "test/consistent-test-it": "off",
      // allow @ts-ignore
      "ts/ban-ts-comment": "off",
      // allow types instead of interfaces
      "ts/consistent-type-definitions": "off",
      // allow interace method as arrow fn
      "ts/method-signature-style": "off",
    },
  })

  if (fullOpts.vue) {
    composer.override("antfu/vue/rules", {
      rules: {
        // <component-name>
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
          registeredComponentsOnly: false,
        }],
        // allow v-for without :key
        "vue/require-v-for-key": "off",
      },
    })

    if (fullOpts.vuePug) {
      composer.append(interopDefault(import("eslint-plugin-vue-pug")).then(vuePug => ({
        // vue-pug doesn't support eslint flat config
        // The following code is cherry-picked from eslint-plugin-vue-pug/lib/configs/base.js
        // See: https://github.com/rashfael/eslint-plugin-vue-pug/issues/28
        name: "vue-pug",
        files: ["**/*.vue"],
        languageOptions: {
          parserOptions: {
            templateTokenizer: { pug: "vue-eslint-parser-template-tokenizer-pug" },
          },
        },
        plugins: {
          "vue-pug": vuePug,
        },
        rules: {
          // base
          "vue/component-name-in-template-casing": "off",
          "vue/html-self-closing": "off",
          "vue/html-end-tags": "off",
          "vue/html-indent": "off",
          "vue/multiline-html-element-content-newline": "off",
          "vue/singleline-html-element-content-newline": "off",
          // vue3-essential
          "vue-pug/no-parsing-error": "error",
          // vue3-strongly-recommended
          "vue-pug/no-pug-control-flow": "warn",
        },
      } satisfies Linter.Config)))
    }
  }

  return composer
}
