module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: [],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'content', 'else', 'return', 'extend']
      }
    ]
  }
};
