import type { Linter } from 'eslint';
import pluginN from 'eslint-plugin-n';
import globals from 'globals';

export const node: Linter.Config[] = [
  {
    name: '@chuli-dev/node/esm',
    files: ['**/*.{js,mjs,ts,mts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2022,
        ...globals.node,

        require: 'off',
        module: 'off',
        exports: 'off',
        __dirname: 'off',
        __filename: 'off',
      },
    },
    plugins: {
      n: pluginN,
    },
    rules: {
      'n/no-deprecated-api': 'error',
      'n/prefer-node-protocol': 'error',
      'n/no-process-exit': 'error',
      'no-restricted-globals': ['error', 'require', 'module', 'exports'],
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='require']",
          message: 'CommonJS require is not allowed. Use ESM import syntax.',
        },
        {
          selector: "AssignmentExpression[left.object.name='module'][left.property.name='exports']",
          message: 'module.exports is not allowed. Use ESM export syntax.',
        },
        {
          selector: "AssignmentExpression[left.object.name='exports']",
          message: 'exports.* is not allowed. Use ESM export syntax.',
        },
      ],
    },
  },
];
