import { ValidationError } from '@chuli-dev/errors';

export class MissingCommandError extends ValidationError {
  constructor() {
    super('No command provided');
  }
}
