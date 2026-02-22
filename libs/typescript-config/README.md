# @chuli-dev/typescript-config

Strict TypeScript configuration presets optimized for modern ESM development.

## ✨ Features

- **ESM-first** - Optimized for native ES Modules
- **Strict by default** - Most strict TypeScript validations enabled
- **Multi-platform** - Configurations for Node.js, Web, React, and libraries
- **Zero-config** - Sensible defaults that work out of the box

## 📦 Installation

```bash
npm install --save-dev @chuli-dev/typescript-config typescript
```

## 🚀 Quick Start

Choose the configuration that matches your project:

### Node.js Application

```json
{
  "extends": "@chuli-dev/typescript-config/node",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "dist",
    "node_modules",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### Web/Browser Application

```json
{
  "extends": "@chuli-dev/typescript-config/web",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "dist",
    "node_modules",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### React Application

```json
{
  "extends": "@chuli-dev/typescript-config/react",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "dist",
    "node_modules",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx"
  ]
}
```

### Library (npm package)

```json
{
  "extends": "@chuli-dev/typescript-config/lib",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "dist",
    "node_modules",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

Use this setup for framework-agnostic libraries when your source code lives in `src/`.

### Node.js Library (npm package)

```json
{
  "extends": "@chuli-dev/typescript-config/node.lib",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "dist",
    "node_modules",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

Use this setup for libraries that run in Node.js and need Node.js typings.

## 📋 Available Configurations

| Configuration  | Description                           | Use Case                |
| -------------- | ------------------------------------- | ----------------------- |
| **`base`**     | Minimal setup with strict validations | Custom setups           |
| **`lib`**      | Library with declaration generation   | Publishing npm packages |
| **`node`**     | Node.js with ES modules               | Server applications     |
| **`node.lib`** | Node.js library with Node typings     | Node.js packages        |
| **`web`**      | Browser environment                   | Web applications        |
| **`react`**    | React with JSX support                | React applications      |

## 📝 Notes

- Library presets only enable `declaration` and `declarationMap`. Configure `rootDir`, `outDir`, `include`, and `exclude` in your project.
- Use `lib` for framework-agnostic libraries, and `node.lib` when your library targets Node.js and needs Node typings.
- The `exclude` patterns shown are examples. Keep tests in `exclude` only if they should not be part of your build output.
- `noUnusedLocals` is not enabled by default. Turn it on if you want it.

## 🔧 Requirements

- **TypeScript** `>=5.0.0`
- **Node.js** `>=20.0.0`

## 📄 License

MIT - see the [LICENSE](https://github.com/TomasAntunez/chuli-dev-libs/blob/main/libs/typescript-config/LICENSE) file for details.

## 👤 Author

**chuli-dev** - [@TomasAntunez](https://github.com/TomasAntunez)
