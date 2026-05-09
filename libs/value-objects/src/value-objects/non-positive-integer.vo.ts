import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Integer } from './integer.vo.js';

export class NonPositiveInteger extends Integer {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value > 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a non-positive integer', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed > 0) {
      throw new InvalidValueError(
        options.message ?? 'Value must be a non-positive integer string',
        {
          metadata: { value },
        },
      );
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): NonPositiveInteger {
    NonPositiveInteger.validate(value, options);
    return new NonPositiveInteger(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): NonPositiveInteger {
    return new NonPositiveInteger(NonPositiveInteger.validateString(value, options));
  }
}
