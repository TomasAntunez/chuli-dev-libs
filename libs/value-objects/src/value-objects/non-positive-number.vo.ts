import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { NumberVo } from './number.vo.js';

export class NonPositiveNumberVo extends NumberVo {
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

  static override fromNumber(value: number, options: ValidateOptions = {}): NonPositiveNumberVo {
    NonPositiveNumberVo.validate(value, options);
    return new NonPositiveNumberVo(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): NonPositiveNumberVo {
    return new NonPositiveNumberVo(NonPositiveNumberVo.validateString(value, options));
  }
}
