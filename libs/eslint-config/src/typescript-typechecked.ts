import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

import { typescriptBase } from './typescript-base.js';

const typecheckedFiles = ['**/*.{ts,tsx,mts}'];

export const typescriptTypechecked: Linter.Config[] = [
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: typecheckedFiles,
  })),

  {
    name: '@chuli-dev/typescript/typechecked/parser-options',
    files: typecheckedFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },

  ...typescriptBase,

  {
    name: '@chuli-dev/typescript/typechecked/rules',
    files: typecheckedFiles,
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
];
