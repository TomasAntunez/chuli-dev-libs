import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dists = [
  { dir: 'dist/esm', type: 'module' },
  { dir: 'dist/cjs', type: 'commonjs' },
];

export function writeDistPackageJsons(): void {
  for (const { dir, type } of dists) {
    const path = resolve(process.cwd(), dir);
    if (!existsSync(path)) continue;
    writeFileSync(`${path}/package.json`, JSON.stringify({ type }, null, 2) + '\n');
  }
}
