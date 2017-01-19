module.exports = {
  'env': {
    'node': true,
    'es6': true
  },
  'extends': [
    'semistandard',
    'eslint:recommended'
  ],
  'plugins': [
    'standard',
    'promise'
  ],
  'globals': {
    '_': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
    },
    'sourceType': 'module'
  },
  'rules': {
    'semi': 'error',
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'ignore',
      'asyncArrow': 'ignore'
    }],
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 1
    }],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'no-empty': 'off'
  }
};
