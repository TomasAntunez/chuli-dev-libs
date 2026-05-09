import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Decimal } from './decimal.vo.js';

export class Integer extends Decimal {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (!Number.isInteger(value)) {
      throw new InvalidValueError(options.message ?? 'Value must be an integer', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (!Number.isInteger(parsed)) {
      throw new InvalidValueError(options.message ?? 'Value must be an integer string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): Integer {
    Integer.validate(value, options);
    return new Integer(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): Integer {
    return new Integer(Integer.validateString(value, options));
  }
}
