import { type Bool, type Text, ValueObject } from '@chuli-dev/value-objects';

import { BOOL_FALSE, BOOL_TRUE } from './constants.js';
import type { Identifier } from './identifier.vo.js';

export interface ArgumentProps {
  readonly name: Identifier;
  readonly description?: Text;
  readonly isRequired?: Bool;
  readonly isVariadic?: Bool;
}

export class Argument extends ValueObject {
  readonly name: Identifier;
  readonly description?: Text;
  readonly isRequired: Bool;
  readonly isVariadic: Bool;

  constructor(props: ArgumentProps) {
    super();
    this.name = props.name;
    if (props.description !== undefined) {
      this.description = props.description;
    }
    this.isRequired = props.isRequired ?? BOOL_TRUE;
    this.isVariadic = props.isVariadic ?? BOOL_FALSE;
  }
}
