import { ValidationError } from '@chuli-dev/errors';

export class UnexpectedArgumentError extends ValidationError {
  constructor(token: string) {
    super(`Unexpected argument: ${token}`, {
      metadata: { token },
    });
  }
}
