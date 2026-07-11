import { ValidationError } from '@chuli-dev/errors';

export class UnknownOptionError extends ValidationError {
  constructor(token: string) {
    super(`Unknown option: ${token}`, {
      metadata: { token },
    });
  }
}
