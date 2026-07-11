import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Primitive } from './primitive.vo.js';
import { Text } from './text.vo.js';

export class Bool extends Primitive<boolean> {
  static validate(value: boolean, options: ValidateOptions = {}): void {
    if (typeof value !== 'boolean') {
      throw new InvalidValueError(options.message ?? 'Value must be a boolean', {
        metadata: { value },
      });
    }
  }

  static validateString(value: string, options: ValidateOptions = {}): boolean {
    const trimmed = Text.validate(value, options);

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

  static fromBoolean(this: void, value: boolean, options: ValidateOptions = {}): Bool {
    Bool.validate(value, options);
    return new Bool(value);
  }

  static fromString(value: string, options: ValidateOptions = {}): Bool {
    return new Bool(Bool.validateString(value, options));
  }

  toBoolean(): boolean {
    return this.value;
  }

  override toString(): string {
    return String(this.value);
  }
}
