# @chuli-dev/eslint-config

Strict ESLint flat-config presets optimized for modern ESM TypeScript projects.

## ✨ Features

- **ESM-first** - Presets are designed for native ES Modules only
- **Flat config ready** - Built for ESLint v9+ `eslint.config.js`
- **Composable presets** - Mix `base`, `node`, and TypeScript presets as needed
- **Practical defaults** - Strong rules for code quality, imports, and consistency

## 🚀 Setups by Use Case

### JavaScript / ESM only (`base` + `node`)

Install:

```bash
npm install --save-dev @chuli-dev/eslint-config eslint eslint-config-prettier eslint-plugin-simple-import-sort eslint-plugin-unused-imports @eslint/js globals eslint-plugin-n
```

Config (`eslint.config.js`):

```js
import { base, node } from '@chuli-dev/eslint-config';

export default [...base, ...node];
```

### TypeScript without type-aware linting (`base` + `node` + `typescript`)

Install:

```bash
npm install --save-dev @chuli-dev/eslint-config eslint eslint-config-prettier typescript typescript-eslint eslint-plugin-simple-import-sort eslint-plugin-unused-imports @eslint/js globals eslint-plugin-n
```

Config (`eslint.config.js`):

```js
import { base, node, typescript } from '@chuli-dev/eslint-config';

export default [...base, ...node, ...typescript];
```

Use this setup when you want strict TS rules with faster linting.

### TypeScript with type-aware linting (`base` + `node` + `typescriptTypechecked`)

Install:

```bash
npm install --save-dev @chuli-dev/eslint-config eslint eslint-config-prettier typescript typescript-eslint eslint-plugin-simple-import-sort eslint-plugin-unused-imports @eslint/js globals eslint-plugin-n
```

Config (`eslint.config.js`):

```js
import { base, node, typescriptTypechecked } from '@chuli-dev/eslint-config';

export default [...base, ...node, ...typescriptTypechecked];
```

Use this setup when you want rules that require TypeScript type information.

## 📋 Available Configurations

| Configuration               | Description                                          | Use Case                              |
| --------------------------- | ---------------------------------------------------- | ------------------------------------- |
| **`base`**                  | Core JS/TS quality rules + import ordering           | Any ESM project                       |
| **`node`**                  | Node.js environment + ESM-only restrictions          | Node.js apps and libraries            |
| **`typescript`**            | Strict TypeScript rules (without type-aware linting) | TS projects prioritizing lint speed   |
| **`typescriptTypechecked`** | Strict TypeScript rules with type-aware linting      | TS projects needing deeper guarantees |
| **`typescriptBase`**        | Shared TS overrides used by both TS presets          | Advanced custom composition           |

## 📝 Notes

- This package targets **ESM-only** codebases.
- The `base` preset includes `eslint-config-prettier` to disable rules that conflict with Prettier formatting.
- `typescriptTypechecked` applies type-aware rules only to `*.ts`, `*.tsx`, and `*.mts` files.
- For type-aware linting, ensure your project has a valid TypeScript setup (`tsconfig.json`).

## 🔧 Requirements

- **Node.js** `>=20`
- **ESLint** `>=9`
- **TypeScript** `>=5` (only if using TypeScript presets)

## 📄 License

MIT - see the [LICENSE](https://github.com/TomasAntunez/chuli-dev-libs/blob/main/libs/eslint-config/LICENSE) file for details.

## 👤 Author

**chuli-dev** - [@TomasAntunez](https://github.com/TomasAntunez)
