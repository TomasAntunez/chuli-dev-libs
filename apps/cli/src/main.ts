import { writeDistPackageJsons } from './commands/write-dist-package-jsons.js';

const commands = {
  'write-dist-package-jsons': writeDistPackageJsons,
} as const;

type CommandName = keyof typeof commands;

const [, , name, ...args] = process.argv;
const handler = name ? commands[name as CommandName] : undefined;

if (!handler) {
  const available = Object.keys(commands).join(', ');
  throw new Error(`Unknown command: ${name ?? '(none)'}. Available: ${available}`);
}

handler(args);
