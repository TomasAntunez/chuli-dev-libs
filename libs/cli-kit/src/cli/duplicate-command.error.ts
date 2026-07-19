import { BusinessRuleError } from '@chuli-dev/errors';

export class DuplicateCommandError extends BusinessRuleError {
  constructor(command: string) {
    super(`Duplicate command: ${command}`, {
      metadata: { command },
    });
  }
}
