module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  ignorePatterns: ['dist'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'unused-imports', 'no-relative-import-paths'],
  extends: ['eslint:recommended', 'plugin:@tanstack/eslint-plugin-query/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'airbnb', 'airbnb-typescript', 'plugin:react/jsx-runtime', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'consistent-return': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'react*', group: 'builtin', position: 'before' },
          { pattern: '@/**', group: 'external', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/prefer-default-export': 'off',
    'newline-before-return': 'error',
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true, prefix: '@', rootDir: 'src' },
    ],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'react/hook-use-state': 'error',
    'react/jsx-key': ["error", { "checkFragmentShorthand": true }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        multiline: 'last',
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: false,
      },
    ],
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*', '!src/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
