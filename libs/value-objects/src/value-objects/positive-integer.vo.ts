import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { IntegerVo } from './integer.vo.js';

export class PositiveIntegerVo extends IntegerVo {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value <= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a positive integer', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed <= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a positive integer string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): PositiveIntegerVo {
    PositiveIntegerVo.validate(value, options);
    return new PositiveIntegerVo(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): PositiveIntegerVo {
    return new PositiveIntegerVo(PositiveIntegerVo.validateString(value, options));
  }
}
