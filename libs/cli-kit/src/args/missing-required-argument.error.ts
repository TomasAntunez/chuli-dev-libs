import { ValidationError } from '@chuli-dev/errors';

export class MissingRequiredArgumentError extends ValidationError {
  constructor(name: string, key: string) {
    super(`Missing required argument: ${name}`, {
      metadata: { name, key },
    });
  }
}
