import { InvalidValueError, ValueObject } from '@chuli-dev/value-objects';

import type { Option } from './option.vo.js';

export class OptionList extends ValueObject {
  readonly items: readonly Option[];

  constructor(items: readonly Option[]) {
    super();

    const seenNames = new Set<string>();
    const seenShortNames = new Set<string>();

    for (const option of items) {
      const name = option.name.toString();

      if (seenNames.has(name)) {
        throw new InvalidValueError(`Duplicate option name: ${name}`, {
          metadata: { name },
        });
      }
      seenNames.add(name);

      if (option.shortName === undefined) continue;

      const shortName = option.shortName.toString();

      if (seenShortNames.has(shortName)) {
        throw new InvalidValueError(`Duplicate option short name: ${shortName}`, {
          metadata: { shortName },
        });
      }
      seenShortNames.add(shortName);
    }

    this.items = items;
  }
}
