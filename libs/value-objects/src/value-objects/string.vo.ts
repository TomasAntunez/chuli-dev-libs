import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { PrimitiveVo } from './primitive.vo.js';

export class StringVo extends PrimitiveVo<string> {
  static validate(value: string, options: ValidateOptions = {}): string {
    if (typeof value !== 'string') {
      throw new InvalidValueError(options.message ?? 'Value must be a string', {
        metadata: { value },
      });
    }

    const trimmed = value.trim();
    if (trimmed.length === 0) {
      throw new InvalidValueError(options.message ?? 'Value must not be empty', {
        metadata: { value },
      });
    }

    return trimmed;
  }

  static fromString(value: string, options: ValidateOptions = {}): StringVo {
    return new StringVo(StringVo.validate(value, options));
  }

  override toString(): string {
    return this.value;
  }
}
