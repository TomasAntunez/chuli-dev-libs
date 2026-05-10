import { InvalidValueError, ValueObject } from '@chuli-dev/value-objects';

import type { Argument } from './argument.vo.js';

export class ArgumentList extends ValueObject {
  readonly items: readonly Argument[];

  constructor(items: readonly Argument[]) {
    super();

    const seenNames = new Set<string>();
    let optionalSeen = false;
    let variadicSeen = false;

    for (const argument of items) {
      const name = argument.name.toString();

      if (seenNames.has(name)) {
        throw new InvalidValueError(`Duplicate argument name: ${name}`, {
          metadata: { name },
        });
      }
      seenNames.add(name);

      if (variadicSeen) {
        throw new InvalidValueError('Variadic argument must be the last one', {
          metadata: { name },
        });
      }
      if (argument.isVariadic.toBoolean()) {
        variadicSeen = true;
      }

      if (argument.isRequired.toBoolean()) {
        if (optionalSeen) {
          throw new InvalidValueError(`Required argument '${name}' cannot follow an optional one`, {
            metadata: { name },
          });
        }
      } else {
        optionalSeen = true;
      }
    }

    this.items = items;
  }
}
