import { InvalidValueError, Text } from '@chuli-dev/value-objects';

const IDENTIFIER_PATTERN = /^[a-z][a-z0-9-]+$/;

export class Identifier extends Text {
  static override validate(value: string): string {
    const trimmed = super.validate(value, {
      message: 'Identifier must be a non-empty string',
    });

    const normalized = trimmed.toLowerCase();

    if (!IDENTIFIER_PATTERN.test(normalized)) {
      throw new InvalidValueError(
        'Identifier must start with a letter, contain only letters, digits, and hyphens, and be at least 2 characters long',
        { metadata: { value } },
      );
    }

    return normalized;
  }

  static override fromString(value: string): Identifier {
    return new Identifier(Identifier.validate(value));
  }
}
