export function defineStylelintConfig() {
  // Hardcoded config for now.
  return {
    extends: [
      "stylelint-config-standard-scss",
      "stylelint-config-standard-vue/scss",
      "@stylistic/stylelint-config",
    ],
    rules: {
      // don't add empty line before @include
      "at-rule-empty-line-before": null,
      // allow non-kebab-case --vars
      "custom-property-pattern": null,
      // allow @include followed by class, TODO: improve
      "declaration-empty-line-before": null,
      // allow @import in the middle of SCSS, TODO: improve
      "no-invalid-position-at-import-rule": null,
      // allow non-kebab-case mixin names, TODO: rename mixins
      "scss/at-mixin-pattern": null,
      // require @if (brackets)
      "scss/at-rule-conditional-no-parentheses": null,
      // allow empty comment headers
      "scss/comment-no-empty": null,
      // allow SCSS partials, TODO: rename partials
      "scss/load-no-partial-leading-underscore": null,
      // allow non-kebab-case class names such as _modifier
      "selector-class-pattern": null,
    },
  }
}
