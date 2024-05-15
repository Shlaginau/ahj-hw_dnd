const airbnbBase = require('eslint-config-airbnb-base');

module.exports = [
  {
    ignores: ['node_modules/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        browser: 'readonly',
        es2021: 'readonly',
        jest: 'readonly'
      }
    },
    linterOptions: {
      noInlineConfig: false
    },
    rules: {
      ...airbnbBase.rules,
      'no-underscore-dangle': 'off',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  }
];