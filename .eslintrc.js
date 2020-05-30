module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    amd: true,
    node: true,
    // 影响 global
    es2017: true,
  },
  plugins: ['@typescript-eslint', 'jest', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 无法推导
    // https://github.com/yannickcr/eslint-plugin-react/issues/2135
    'react/prop-types': [0, { ignore: ['children'] }],
    // Non-component functions that return JSX https://github.com/yannickcr/eslint-plugin-react/issues/512
    'react/display-name': [1],
    // 有时候 require 写起来更方便
    '@typescript-eslint/no-var-requires': 'warn',
    // 不一定会写 return 类型
    '@typescript-eslint/explicit-function-return-type': 0,
    // 允许直接使用 any
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': "off",
    // 方法可以先用后定义
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
  },
};
