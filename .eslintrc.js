module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      excludedFiles: '*.test.js',
      rules: {
        "require-jsdoc": "off"
      }
    },
  ],
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-use-before-define': 0,
    'prefer-arrow-callback': 0,
    'no-else-return': 0,
    'react/prop-types': 0,
    'no-alert': 0,
    'no-console': 0,
    'object-shorthand': 0,
    'react/jsx-curly-newline': 0,
    'react/state-in-constructor': 0,
    'react/jsx-boolean-value': 0,
    'no-shadow': 0,
    'no-unneeded-ternary': 0,
    'react/destructuring-assignment': 0,
    'react/prefer-stateless-function': 0,
    'func-names': 0,
    'prefer-template': 0,
    'no-var': 0,
    'vars-on-top': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    'react/static-property-placement': 0,
    'react/jsx-closing-bracket-location': 0,
    'no-trailing-spaces': 0,
    'import/prefer-default-export': 0,
    'no-unescaped-entities': 0,
    'global-require': 0,
    'jsx-a11y/accessible-emoji': 0,
    'react/jsx-no-duplicate-props': 0,
  },
};
