module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    mocha: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
};
