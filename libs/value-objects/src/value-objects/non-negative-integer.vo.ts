import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { IntegerVo } from './integer.vo.js';

export class NonNegativeIntegerVo extends IntegerVo {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value < 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a non-negative integer', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed < 0) {
      throw new InvalidValueError(
        options.message ?? 'Value must be a non-negative integer string',
        {
          metadata: { value },
        },
      );
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): NonNegativeIntegerVo {
    NonNegativeIntegerVo.validate(value, options);
    return new NonNegativeIntegerVo(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): NonNegativeIntegerVo {
    return new NonNegativeIntegerVo(NonNegativeIntegerVo.validateString(value, options));
  }
}
