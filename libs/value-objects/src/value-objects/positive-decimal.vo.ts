import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Decimal } from './decimal.vo.js';

export class PositiveDecimal extends Decimal {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value <= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a positive number', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed <= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a positive number string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): PositiveDecimal {
    PositiveDecimal.validate(value, options);
    return new PositiveDecimal(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): PositiveDecimal {
    return new PositiveDecimal(PositiveDecimal.validateString(value, options));
  }
}
