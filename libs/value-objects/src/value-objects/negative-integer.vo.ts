import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { IntegerVo } from './integer.vo.js';

export class NegativeIntegerVo extends IntegerVo {
  static override validate(value: number, options: ValidateOptions = {}): void {
    super.validate(value, options);

    if (value >= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a negative integer', {
        metadata: { value },
      });
    }
  }

  static override validateString(value: string, options: ValidateOptions = {}): number {
    const parsed = super.validateString(value, options);

    if (parsed >= 0) {
      throw new InvalidValueError(options.message ?? 'Value must be a negative integer string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static override fromNumber(value: number, options: ValidateOptions = {}): NegativeIntegerVo {
    NegativeIntegerVo.validate(value, options);
    return new NegativeIntegerVo(value);
  }

  static override fromString(value: string, options: ValidateOptions = {}): NegativeIntegerVo {
    return new NegativeIntegerVo(NegativeIntegerVo.validateString(value, options));
  }
}
