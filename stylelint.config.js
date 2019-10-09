module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-selector-bem-pattern'],
  rules: {
    'prettier/prettier': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'content', 'else', 'return', 'extend'],
      },
    ],
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      componentName: '^[A-Za-z-]+',
      componentSelectors: {
        initial: `^\\.{componentName}(?:(__|--)\\w[\\w-_]*)?$`,
        combined: `^(\\.{componentName}(?:(__|--)\\w[\\w-_]*)?)$`,
      },
    },
  },
};
