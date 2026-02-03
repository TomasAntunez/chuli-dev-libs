import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';

export const typescriptTypechecked = [
  ...tseslint.configs.strictTypeChecked,

  {
    name: '@chuli-dev/typescript/typechecked/parser-options',
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
    },
  },
] satisfies Linter.Config[];
