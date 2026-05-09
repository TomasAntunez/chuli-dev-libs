import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { NumberVo } from './number.vo.js';

export class NegativeNumberVo extends NumberVo {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value >= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a negative number', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed >= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a negative number string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): NegativeNumberVo {
    NegativeNumberVo.validate(value, options);
    return new NegativeNumberVo(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): NegativeNumberVo {
    return new NegativeNumberVo(NegativeNumberVo.validateString(value, options));
  }
}
