# @chuli-dev/eslint-config

Self-contained ESLint flat-config presets for modern TypeScript projects.

## ✨ Features

- **One import, one preset** - Each preset is a complete ESLint flat config; just `export default` it
- **Three orthogonal axes** - TypeScript (`none` / `strict` / `type-aware`) × Node.js × ESM enforcement
- **Flat config ready** - Built for ESLint v9+ `eslint.config.js`
- **Practical defaults** - Strong rules for code quality, imports, and consistency

## 📦 Installation

```bash
npm install --save-dev @chuli-dev/eslint-config eslint @eslint/js eslint-config-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports eslint-plugin-n globals typescript typescript-eslint
```

Each preset only depends on a subset of the peers above:

| Peer dependency                    | Required by                  |
| ---------------------------------- | ---------------------------- |
| `eslint`                           | All presets                  |
| `@eslint/js`                       | All presets                  |
| `eslint-config-prettier`           | All presets                  |
| `eslint-plugin-simple-import-sort` | All presets                  |
| `eslint-plugin-unused-imports`     | All presets                  |
| `globals`                          | All presets                  |
| `eslint-plugin-n`                  | Any `node` / `*Node*` preset |
| `typescript`                       | Any `typescript*` preset     |
| `typescript-eslint`                | Any `typescript*` preset     |

> With npm v7+, peer dependencies are installed automatically when you add `@chuli-dev/eslint-config`.

## 🚀 Quick Start

Pick the preset that matches your project and use it directly as your flat config:

```js
// eslint.config.js
import { typescriptTypecheckedNodeEsm } from '@chuli-dev/eslint-config';

export default typescriptTypecheckedNodeEsm;
```

## 📋 Available Presets

| Preset                             | TypeScript | Node.js | ESM enforcement |
| ---------------------------------- | ---------- | ------- | --------------- |
| **`base`**                         | —          | —       | —               |
| **`node`**                         | —          | ✓       | —               |
| **`esm`**                          | —          | —       | ✓               |
| **`nodeEsm`**                      | —          | ✓       | ✓               |
| **`typescript`**                   | strict     | —       | —               |
| **`typescriptEsm`**                | strict     | —       | ✓               |
| **`typescriptNode`**               | strict     | ✓       | —               |
| **`typescriptNodeEsm`**            | strict     | ✓       | ✓               |
| **`typescriptTypechecked`**        | type-aware | —       | —               |
| **`typescriptTypecheckedEsm`**     | type-aware | —       | ✓               |
| **`typescriptTypecheckedNode`**    | type-aware | ✓       | —               |
| **`typescriptTypecheckedNodeEsm`** | type-aware | ✓       | ✓               |

### What each axis adds

- **TypeScript `strict`** - Enables `typescript-eslint`'s strict ruleset without type information.
- **TypeScript `type-aware`** - Adds rules that require type information (`no-floating-promises`, `no-misused-promises`, etc.). Requires a valid `tsconfig.json`.
- **Node.js** - Adds Node globals and `eslint-plugin-n` rules (`no-deprecated-api`, `prefer-node-protocol`, `no-process-exit`).
- **ESM enforcement** - Forces `sourceType: 'module'`, disables CJS globals, and forbids `require()` / `module.exports` syntax.

## 📝 Notes

- All presets include `eslint-config-prettier` to disable rules that conflict with Prettier formatting.
- Type-aware presets (`*Typechecked*`) lint only `*.ts`, `*.tsx`, `*.mts` files and require a `tsconfig.json` at the project root (via `projectService`).

## 🔧 Requirements

- **Node.js** `>=20`
- **ESLint** `>=9`
- **TypeScript** `>=5` (only if using TypeScript presets)

## 📄 License

MIT - see the [LICENSE](https://github.com/TomasAntunez/chuli-dev-libs/blob/main/libs/eslint-config/LICENSE) file for details.

## 👤 Author

**chuli-dev** - [@TomasAntunez](https://github.com/TomasAntunez)
