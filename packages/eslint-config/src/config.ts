import { antfu } from "@antfu/eslint-config"
import vuePug from "eslint-plugin-vue-pug"

type AntfuEslintOptions = Exclude<Parameters<typeof antfu>[0], undefined>

export interface EslintOptions extends AntfuEslintOptions {
  /**
   * Enable Vue support.
   *
   * @default false (unlike antfu, which defaults to auto-detect).
   */
  vue?: boolean
  /**
   * Enable Vue pug rules.
   *
   * Must be used with care, as it disables many built-in Vue rules.
   *
   * @default false
   */
  vuePug?: boolean
}

// Workaround for error TS2742:
// The inferred type of 'defineConfig' cannot be named without a reference to '.pnpm/eslint-flat-config-utils@0.3.1/node_modules/eslint-flat-config-utils'.
// This is likely not portable. A type annotation is necessary.
export type FlatConfigComposer = ReturnType<typeof antfu>

// TODO: add antfu-style ...args chaining as needed.
export function defineConfig(options: EslintOptions = {}): FlatConfigComposer {
  const {
    vue: enableVue = false,
    vuePug: enableVuePug = false,
    stylistic: stylisticOptions,
    rules,
    ...antfuOptions
  } = options

  if (!enableVue && enableVuePug) {
    throw new Error(`"vuePug" option requires "vue" option to be enabled.`)
  }

  const composer = antfu({
    ...antfuOptions,
    vue: enableVue,
    stylistic: stylisticOptions === false
      ? false
      : {
          quotes: "double",
          ...(typeof stylisticOptions !== "boolean" ? stylisticOptions : undefined),
        },
    rules: {
      // always add if { ... } braces
      "curly": ["error", "all"],
      // allow multiple chained function calls on single line
      "antfu/consistent-chaining": "off",
      // allow const functions
      "antfu/top-level-function": "off",
      // allow console.log
      "no-console": "warn",
      // allow arrays [, a]
      "no-sparse-arrays": "off",
      // allow string + string
      "prefer-template": "off",
      "perfectionist/sort-imports": ["error", {
        groups: [
          ["builtin", "builtin-type"],
          ["external", "external-type"],
          ["internal", "internal-type"],
          ["parent", "parent-type"],
          ["sibling", "sibling-type", "index", "index-type"],
          "unknown",
        ],
        newlinesBetween: "always",
        internalPattern: [
          "^~",
          "^#",
          "^@/",
        ],
        order: "asc",
        type: "natural",
      }],
      "perfectionist/sort-named-imports": ["error", {
        ignoreAlias: true,
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
      ...rules,
    },
  }, {
    // Keep default package.json formatting.
    files: ["**/package.json"],
    rules: {
      "jsonc/indent": ["error", 2],
    },
  })

  if (enableVue) {
    composer.override("antfu/vue/rules", {
      rules: {
        // <component-name>
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
          registeredComponentsOnly: false,
        }],
        // allow v-for without :key
        "vue/require-v-for-key": "off",
        // allow string + string
        "vue/prefer-template": "off",
      },
    })

    if (enableVuePug) {
      composer.override("antfu/vue/setup", {
        plugins: {
          "vue-pug": vuePug,
        },
      })
      composer.override("antfu/vue/rules", (t) => {
        t.languageOptions!.parserOptions!.templateTokenizer = {
          pug: "vue-eslint-parser-template-tokenizer-pug",
        }
        return t
      })
      composer.override("antfu/vue/rules", {
        rules: {
          // This is combined from eslint-plugin-vue-pug/lib/configs/*.js
          // Disable built-in Vue rules because they either report false positives or break pug on autofix.
          "vue/component-name-in-template-casing": "off",
          "vue/html-self-closing": "off",
          "vue/html-end-tags": "off",
          "vue/html-indent": "off",
          "vue/multiline-html-element-content-newline": "off",
          "vue/singleline-html-element-content-newline": "off",
          "vue-pug/no-parsing-error": "error",
          "vue-pug/no-pug-control-flow": "warn",
          // TODO: add vue-pug/component-name-in-template-casing (currently crashes).
        },
      })
    }
  }

  return composer
}
