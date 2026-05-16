import js from '@eslint/js';
import type { Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const importSortGroups: string[][] = [
  ['^\\u0000'],
  ['^node:'],
  ['^@?\\w'],
  ['^(@/|~\\/|src/|app/|libs/|@libs/|@shared/)'],
  ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
  ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
];

export const base: Linter.Config[] = [
  {
    name: '@chuli-dev/base/ignores',
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.tsbuildinfo*',
    ],
  },

  js.configs.recommended,

  {
    name: '@chuli-dev/base/rules',
    files: ['**/*.{js,mjs,jsx,ts,tsx,mts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2022,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',

      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],

      'simple-import-sort/imports': ['warn', { groups: importSortGroups }],
      'simple-import-sort/exports': 'warn',
    },
  },

  prettierConfig,
];
