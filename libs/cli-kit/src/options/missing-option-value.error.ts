import { ValidationError } from '@chuli-dev/errors';

export class MissingOptionValueError extends ValidationError {
  constructor(token: string, key: string) {
    super(`Missing value for option: ${token}`, {
      metadata: { token, key },
    });
  }
}
