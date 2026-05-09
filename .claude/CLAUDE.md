# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

npm workspaces monorepo of shared TypeScript configuration/tooling libraries published to npm under the `@chuli-dev` scope. All packages are ESM-first (`"type": "module"`). Requires Node.js >= 20.

## Coding Principles

Keep everything as minimal as possible without sacrificing robustness. Clean, simple code is preferred above all — but never at the cost of correctness or reliability. When in doubt, choose the simpler option that still covers the real requirements; avoid speculative abstractions, premature configuration, and ceremony that doesn't pull its weight.

## Repository Layout

- `libs/` — Published packages: `typescript-config`, `eslint-config`, `prettier-config`, `errors`, `value-objects`
- `apps/` — Internal/private apps (`example`, `cli`) used to dogfood the libraries

## Common Commands

```bash
# Install all dependencies (from root). Libraries with a `prepare` hook
# (eslint-config, errors, value-objects) are built automatically as part of install.
npm install

# Run the example app in dev mode
npm run start:dev:example

# Quality gates (each fans out to workspaces via --workspaces --if-present)
npm run types:check
npm run lint:check
npm run format:check

# Run a script on a single workspace
npm run lint:check --workspace=@chuli-dev/errors
npm run build --workspace=@chuli-dev/eslint-config
```

## Architecture Notes

- **typescript-config**: Pure JSON config files (no build step). Exports platform-specific tsconfig presets via `./base`, `./lib`, `./node`, `./node.lib`, `./web`, `./react`.
- **eslint-config**: TypeScript source in `src/` that builds to `dist/`. Provides composable ESLint flat config presets (`base`, `node`, `typescript`, `typescriptTypechecked`).
- **prettier-config**: Single JSON config file, no build step.
- **errors**: TypeScript source in `src/` that builds to `dist/`. Domain-oriented error classes.
- **value-objects**: TypeScript source in `src/` that builds to `dist/`. DDD-style Value Object base classes and primitives. Cross-platform (uses `lib` tsconfig, no Node-specific typings); declares `@chuli-dev/errors` as a `peerDependency` so consumers share a single instance across libs.
- Libraries that build (`eslint-config`, `errors`, `value-objects`) use the `prepare` lifecycle hook, so `npm install` from root produces a ready-to-use `dist/` for workspace consumers and for `npm publish`.
- Libraries reference each other via workspace `"*"` versions (e.g., `eslint-config` depends on `typescript-config` for its own build).
- The root `.npmrc` sets `foreground-scripts=true` to serialize workspace `prepare` scripts in topological order, avoiding races where a consumer lib (e.g. `value-objects`) builds before its dependency (e.g. `errors`) finishes.
- Root `package.json` sets the Prettier config for the entire repo via `"prettier": "@chuli-dev/prettier-config"`.

## Quality Gates

The publish workflow enforces three independent checks before any package is published; each fans out to workspaces with `npm run <name> --workspaces --if-present`:

1. `types:check` — `tsc --noEmit` per app (libs are typechecked implicitly during their `prepare` build).
2. `lint:check` — ESLint with `--max-warnings 0`. Warnings are not tolerated; treat them as errors.
3. `format:check` — Prettier check across the whole repo.

To scale to a new lib or app, declare the matching scripts in its `package.json` (`lint:check`, `types:check` for apps, `build` + `prepare` for publishable libs). The root scripts and the workflow pick it up automatically — no infra changes required.

## Publishing

Triggered manually via the `publish-packages.yml` GitHub Actions workflow (`workflow_dispatch`), selecting individual packages to publish. The workflow runs `npm install` (which builds libs via `prepare`), then the three quality gates, then `npm publish` for each selected package.
