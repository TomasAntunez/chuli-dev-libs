import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Text } from './text.vo.js';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class Uuid extends Text {
  static override validate(value: string, options: ValidateOptions = {}): string {
    const trimmed = super.validate(value, options);

    if (!UUID_REGEX.test(trimmed)) {
      throw new InvalidValueError(options.message ?? 'Value must be a valid UUID', {
        metadata: { value },
      });
    }

    return trimmed.toLowerCase();
  }

  static override fromString(this: void, value: string, options: ValidateOptions = {}): Uuid {
    return new Uuid(Uuid.validate(value, options));
  }

  static create(): Uuid {
    return new Uuid(crypto.randomUUID());
  }
}
