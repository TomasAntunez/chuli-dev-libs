import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';
import { typescriptBase } from './typescript-base.js';

export const typescript: Linter.Config[] = [...tseslint.configs.strict, ...typescriptBase];
