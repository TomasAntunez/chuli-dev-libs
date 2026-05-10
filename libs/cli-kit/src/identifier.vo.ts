import { InvalidValueError, Text } from '@chuli-dev/value-objects';

export class Identifier extends Text {
  static override validate(value: string): string {
    const trimmed = super.validate(value, {
      message: 'Identifier must be a non-empty string',
    });

    if (/\s/.test(trimmed)) {
      throw new InvalidValueError('Identifier must not contain whitespace', {
        metadata: { value },
      });
    }

    return trimmed;
  }

  static override fromString(value: string): Identifier {
    return new Identifier(Identifier.validate(value));
  }
}
