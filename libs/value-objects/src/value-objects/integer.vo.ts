import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { NumberVo } from './number.vo.js';

export class IntegerVo extends NumberVo {
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

  static override fromNumber(value: number, options: ValidateOptions = {}): IntegerVo {
    IntegerVo.validate(value, options);
    return new IntegerVo(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): IntegerVo {
    return new IntegerVo(IntegerVo.validateString(value, options));
  }
}
