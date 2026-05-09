import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Decimal } from './decimal.vo.js';

export class NonPositiveDecimal extends Decimal {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value > 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a non-positive number', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed > 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a non-positive number string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): NonPositiveDecimal {
    NonPositiveDecimal.validate(value, options);
    return new NonPositiveDecimal(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): NonPositiveDecimal {
    return new NonPositiveDecimal(NonPositiveDecimal.validateString(value, options));
  }
}
