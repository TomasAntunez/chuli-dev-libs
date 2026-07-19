import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  Command,
  CommandConfig,
  type CommandInput,
  type InputValues,
  OptionType,
} from '@chuli-dev/cli-kit';
import { ConfigurationError } from '@chuli-dev/errors';

type WriteDistPackageJsonsOptions = {
  clean: boolean;
};

type WriteDistPackageJsonsInput = CommandInput<InputValues, WriteDistPackageJsonsOptions>;

export class WriteDistPackageJsonsCommand extends Command<WriteDistPackageJsonsInput> {
  private readonly BUILDS = [
    { tsconfig: 'tsconfig.esm.json', outDir: 'dist/esm', type: 'module' },
    { tsconfig: 'tsconfig.cjs.json', outDir: 'dist/cjs', type: 'commonjs' },
  ];

  readonly config = CommandConfig.fromPrimitives<WriteDistPackageJsonsInput>({
    name: 'write-dist-package-jsons',
    description: 'Write per-flavor package.json files into each dual lib dist',
    options: {
      clean: {
        type: OptionType.Flag,
        name: 'clean',
        description: 'Remove the generated package.json files instead',
      },
    },
  });

  execute(input: WriteDistPackageJsonsInput): void {
    const root = process.env['INIT_CWD'];

    if (!root) {
      throw new ConfigurationError(
        'INIT_CWD is not set. This command must be run via an npm script.',
      );
    }

    const libsDir = resolve(root, 'libs');

    for (const lib of readdirSync(libsDir, { withFileTypes: true })) {
      if (!lib.isDirectory()) continue;

      const libPath = resolve(libsDir, lib.name);

      for (const build of this.BUILDS) {
        if (!existsSync(resolve(libPath, build.tsconfig))) continue;

        const targetPath = resolve(libPath, build.outDir, 'package.json');

        if (input.options.clean) {
          if (existsSync(targetPath)) rmSync(targetPath);
          continue;
        }

        const expected = JSON.stringify({ type: build.type }, null, 2) + '\n';
        if (existsSync(targetPath) && readFileSync(targetPath, 'utf8') === expected) continue;

        writeFileSync(targetPath, expected);
      }
    }
  }
}
