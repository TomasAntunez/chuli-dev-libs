import { InvalidValueError } from '@chuli-dev/value-objects';

import { Identifier } from './identifier.vo.js';

export class ShortIdentifier extends Identifier {
  static override validate(value: string): string {
    const validated = super.validate(value);

    if (validated.length !== 1) {
      throw new InvalidValueError('Short identifier must be exactly one character', {
        metadata: { value },
      });
    }

    return validated;
  }

  static override fromString(value: string): ShortIdentifier {
    return new ShortIdentifier(ShortIdentifier.validate(value));
  }
}
