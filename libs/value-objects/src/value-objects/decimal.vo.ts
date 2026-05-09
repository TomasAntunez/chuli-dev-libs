import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Primitive } from './primitive.vo.js';
import { Text } from './text.vo.js';

export class Decimal extends Primitive<number> {
  static validate(value: number, options: ValidateOptions = {}): void {
    if (!Number.isFinite(value)) {
      throw new InvalidValueError(options.message ?? 'Value must be a finite number', {
        metadata: { value },
      });
    }
  }

  static validateString(value: string, options: ValidateOptions = {}): number {
    const trimmed = Text.validate(value, options);

    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed)) {
      throw new InvalidValueError(options.message ?? 'Value must be a numeric string', {
        metadata: { value },
      });
    }

    return parsed;
  }

  static fromNumber(value: number, options: ValidateOptions = {}): Decimal {
    Decimal.validate(value, options);
    return new Decimal(value);
  }

  static fromString(value: string, options: ValidateOptions = {}): Decimal {
    return new Decimal(Decimal.validateString(value, options));
  }

  toNumber(): number {
    return this.value;
  }

  override toString(): string {
    return String(this.value);
  }
}
