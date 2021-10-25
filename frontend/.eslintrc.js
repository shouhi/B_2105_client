module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
  ],
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    /*=======================
     * off
     *=======================*/

    // jsx内での'import React from 'react''を強制しない
    'react/jsx-runtime': 'off',

    // return の型を強制しない (ts が解析してくれる)
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // any型を許容
    '@typescript-eslint/no-explicit-any': 'off',

    // 型定義の際にカンマやセミコロンを付けない
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'none',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],

    /*=======================
     * warn
     *=======================*/

    // consoleは使用しないよう勧める
    'no-console': 'warn',

    // 変数が変更されることがない場合は const の利用を勧める
    'prefer-const': 'warn',

    // import の順序を alphabet 順にする
    'import/order': [
      'warn',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [
          'builtin',
          'external',
          'unknown',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        alphabetize: { order: 'asc' },
      },
    ],

    /*=======================
     * error
     *=======================*/

    // 全角空白などイレギュラーな空白を指摘
    'no-irregular-whitespace': 'error',

    // `<div></div>` の許可
    'react/self-closing-comp': [
      'error',
      {
        // component の場合は `<div />` を勧める
        component: false,

        // html の場合は許可する
        html: true,
      },
    ],

    // propsの型定義
    'react/prop-types': 'error',

    // 変数のvarを許容しない
    '@typescript-eslint/no-var-requires': 'error',

    // 定義する前に関数を使用できない
    '@typescript-eslint/no-use-before-define': 'error',

    // 定義していない変数を使用できない
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
