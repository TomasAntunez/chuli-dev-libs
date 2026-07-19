import { ValidationError } from '@chuli-dev/errors';

export class UnknownCommandError extends ValidationError {
  constructor(command: string, cli: string) {
    super(`Unknown command: ${command}. Run '${cli} --help' to list the available commands`, {
      metadata: { command, cli },
    });
  }
}
