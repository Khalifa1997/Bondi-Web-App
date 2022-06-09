module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "value-list-comma-newline-after": null,
    "declaration-colon-newline-after": null,
    "comment-empty-line-before": null,
    "block-no-empty": null,
    "at-rule-empty-line-before": null,
    "at-rule-no-unknown": null,
    // "at-rule-no-unknown": [
    //   true,
    //   {
    //     ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"]
    //   }
    // ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null
  }
};
