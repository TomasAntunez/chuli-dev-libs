import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { PrimitiveVo } from './primitive.vo.js';
import { StringVo } from './string.vo.js';

export class BooleanVo extends PrimitiveVo<boolean> {
  static validate(value: boolean, options: ValidateOptions = {}): void {
    if (typeof value !== 'boolean') {
      throw new InvalidValueError(options.message ?? 'Value must be a boolean', {
        metadata: { value },
      });
    }
  }

  static validateString(value: string, options: ValidateOptions = {}): boolean {
    const trimmed = StringVo.validate(value, options);

    if (trimmed === 'true') {
      return true;
    }
    if (trimmed === 'false') {
      return false;
    }

    throw new InvalidValueError(options.message ?? `Value must be 'true' or 'false'`, {
      metadata: { value },
    });
  }

  static fromBoolean(value: boolean, options: ValidateOptions = {}): BooleanVo {
    BooleanVo.validate(value, options);
    return new BooleanVo(value);
  }

  static fromString(value: string, options: ValidateOptions = {}): BooleanVo {
    return new BooleanVo(BooleanVo.validateString(value, options));
  }

  toBoolean(): boolean {
    return this.value;
  }

  override toString(): string {
    return String(this.value);
  }
}
