import { InvalidValueError } from '../errors/invalid-value.error.js';
import type { ValidateOptions } from '../interfaces/validate-options.js';

import { Primitive } from './primitive.vo.js';

export class Text extends Primitive<string> {
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

  static fromString(value: string, options: ValidateOptions = {}): Text {
    return new Text(Text.validate(value, options));
  }

  override toString(): string {
    return this.value;
  }
}
