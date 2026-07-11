import { ValidationError } from '@chuli-dev/errors';

export class RepeatedOptionError extends ValidationError {
  constructor(token: string, key: string) {
    super(`Repeated option: ${token}`, {
      metadata: { token, key },
    });
  }
}
