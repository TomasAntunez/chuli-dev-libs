import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { PrimitiveVo } from './primitive.vo.js';
import { StringVo } from './string.vo.js';

export class NumberVo extends PrimitiveVo<number> {
  static validate(value: number, options: ValidateOptions = {}): void {
    if (!Number.isFinite(value)) {
      throw new InvalidValueError(options.message ?? 'Value must be a finite number', {
        metadata: { value },
      });
    }
  }

  static validateString(value: string, options: ValidateOptions = {}): number {
    const trimmed = StringVo.validate(value, options);

    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed)) {
      throw new InvalidValueError(options.message ?? 'Value must be a numeric string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static fromNumber(value: number, options: ValidateOptions = {}): NumberVo {
    NumberVo.validate(value, options);
    return new NumberVo(value);
  }

  static fromString(value: string, options: ValidateOptions = {}): NumberVo {
    return new NumberVo(NumberVo.validateString(value, options));
  }

  toNumber(): number {
    return this.value;
  }

  override toString(): string {
    return String(this.value);
  }
}
