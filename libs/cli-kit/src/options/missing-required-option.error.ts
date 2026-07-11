import { ValidationError } from '@chuli-dev/errors';

export class MissingRequiredOptionError extends ValidationError {
  constructor(name: string, key: string) {
    super(`Missing required option: ${name}`, {
      metadata: { name, key },
    });
  }
}
