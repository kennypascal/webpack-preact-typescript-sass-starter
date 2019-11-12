module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allow parsing of modern ECMAScript features
    sourceType: 'module', // Allow the use of imports
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'standard',
    'standard-preact',
  ],
  plugins: [],
  rules: {
    // custom ESLint rules, overwrite rules specified from the extended configs
    semi: 0,
    'no-console': 0,
    'max-len': [2, 180, 4, { ignoreUrls: true }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-props-no-spreading': 0,
  },
  overrides: [
    {
      // enable rules specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error']
      },
    },
  ],
  settings: {
    react: {
      pragma: 'h',
    },
  },
};
