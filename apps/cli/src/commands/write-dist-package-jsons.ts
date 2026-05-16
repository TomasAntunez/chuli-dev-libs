import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const BUILDS = [
  { tsconfig: 'tsconfig.esm.json', outDir: 'dist/esm', type: 'module' },
  { tsconfig: 'tsconfig.cjs.json', outDir: 'dist/cjs', type: 'commonjs' },
] as const;

export function writeDistPackageJsons(argv: string[]): void {
  const root = process.env['INIT_CWD'];
  if (!root) throw new Error('INIT_CWD is not set. This command must be run via an npm script.');

  const libsDir = resolve(root, 'libs');
  const clean = argv.includes('--clean');

  for (const libName of readdirSync(libsDir, { withFileTypes: true })) {
    if (!libName.isDirectory()) continue;

    const libPath = resolve(libsDir, libName.name);

    for (const { tsconfig, outDir, type } of BUILDS) {
      if (!existsSync(resolve(libPath, tsconfig))) continue;

      const targetPath = resolve(libPath, outDir, 'package.json');

      if (clean) {
        if (existsSync(targetPath)) rmSync(targetPath);
        continue;
      }

      const expected = JSON.stringify({ type }, null, 2) + '\n';
      if (existsSync(targetPath) && readFileSync(targetPath, 'utf8') === expected) continue;

      writeFileSync(targetPath, expected);
    }
  }
}
