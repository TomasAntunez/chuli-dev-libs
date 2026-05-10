import { type Bool, type Text, ValueObject } from '@chuli-dev/value-objects';

import { BOOL_FALSE } from './constants.js';
import type { Identifier } from './identifier.vo.js';
import type { ShortIdentifier } from './short-identifier.vo.js';

export interface OptionProps {
  readonly name: Identifier;
  readonly shortName?: ShortIdentifier;
  readonly description?: Text;
  readonly isRequired?: Bool;
}

export class Option extends ValueObject {
  readonly name: Identifier;
  readonly shortName?: ShortIdentifier;
  readonly description?: Text;
  readonly isRequired: Bool;

  constructor(props: OptionProps) {
    super();
    this.name = props.name;
    if (props.shortName !== undefined) {
      this.shortName = props.shortName;
    }
    if (props.description !== undefined) {
      this.description = props.description;
    }
    this.isRequired = props.isRequired ?? BOOL_FALSE;
  }
}
