import { Cli } from '@chuli-dev/cli-kit';

import { WriteDistPackageJsonsCommand } from './commands/write-dist-package-jsons.command.js';

const cli = Cli.fromPrimitives({
  name: 'chuli-dev',
  version: '0.0.1',
  description: 'Internal CLI for the chuli-dev monorepo',
  commands: [new WriteDistPackageJsonsCommand()],
});

await cli.run();
