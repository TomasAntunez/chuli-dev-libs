import { parseOptional, Text, ValueObject } from '@chuli-dev/value-objects';

import { Identifier } from '../identifiers/identifier.vo.js';

export interface BaseInputProps {
  name: Identifier;
  description?: Text;
}

export interface BaseInputPrimitives {
  name: string;
  description?: string;
}

export abstract class BaseInput extends ValueObject {
  readonly name: Identifier;
  readonly description?: Text;

  constructor(props: BaseInputProps) {
    super();
    this.name = props.name;
    this.description = props.description;
  }

  protected static parsePrimitives(primitives: BaseInputPrimitives): BaseInputProps {
    return {
      name: Identifier.fromString(primitives.name),
      description: parseOptional(primitives.description, Text.fromString),
    };
  }
}
