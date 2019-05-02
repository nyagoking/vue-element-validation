module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    'vue/html-self-closing': [
      'off',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 20,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'es5',
      }
    ]
  },
};
