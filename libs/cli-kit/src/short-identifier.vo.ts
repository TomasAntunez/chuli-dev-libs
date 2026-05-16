import { InvalidValueError, Text } from '@chuli-dev/value-objects';

const SHORT_IDENTIFIER_PATTERN = /^[a-z]$/;

export class ShortIdentifier extends Text {
  static override validate(value: string): string {
    const trimmed = super.validate(value, {
      message: 'Short identifier must be a non-empty string',
    });

    const normalized = trimmed.toLowerCase();

    if (!SHORT_IDENTIFIER_PATTERN.test(normalized)) {
      throw new InvalidValueError('Short identifier must be exactly one letter', {
        metadata: { value },
      });
    }

    return normalized;
  }

  static override fromString(value: string): ShortIdentifier {
    return new ShortIdentifier(ShortIdentifier.validate(value));
  }
}
