/** @type import('@typescript-eslint/types').ParserOptions */
const parserOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
  project: './tsconfig.json',
  tsconfigRootDir: './',
  extraFileExtensions: ['.mdx'],
};

/** @type import('eslint').Linter.Config */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions,
  env: {
    es2020: true,
    browser: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        paths: ['src'],
      },
    },
  },
  extends: [
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/recommended',
    'xo-space',
    'xo-react/space',
    'xo-typescript/space',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'prettier/unicorn',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['simple-import-sort'],
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/sort': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Packages
              ['^@?\\w'],
              // Absolute imports
              ['^[^.]'],
              // Features
              ['^@/\\w'],
              // Relative imports
              ['^\\.'],
            ],
          },
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    {
      files: ['src/**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['webpack/**/*.ts', '**/*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['src/**/*.stories.ts', 'src/**/*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './*.js',
          'webpack/**/*.ts',
          'src/**/*.test.js',
          'src/**/*.test.ts',
          'src/**/*.stories.ts',
          'src/**/*.stories.tsx',
        ],
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
      'SequenceExpression',
    ],
    'no-restricted-imports': ['error', { patterns: ['../*', '~/@/*'] }],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        whitelist: {
          args: true,
          ref: true,
          Ref: true,
          props: true,
          Props: true,
          dev: true,
          Dev: true,
          prod: true,
          Prod: true,
          env: true,
          Env: true,
          params: true,
          Params: true,
          param: true,
          Param: true,
          config: true,
          Config: true,
        },
      },
    ],
    'react/require-default-props': [
      'warn',
      {
        forbidDefaultForRequired: true,
        ignoreFunctionalComponents: true,
      },
    ],
    'consistent-return': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',

    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',

    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',

    'unicorn/no-null': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-reduce': 'off',

    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
  },
};

module.exports = config;
