import { BaseOption, type BaseOptionPrimitives, type BaseOptionProps } from './base-option.vo.js';
import { OptionType } from './option-type.enum.js';

export interface FlagProps extends BaseOptionProps {
  parse?: (present: boolean) => unknown;
}

export interface FlagPrimitives extends BaseOptionPrimitives {
  parse?: (present: boolean) => unknown;
}

export class Flag extends BaseOption {
  readonly type = OptionType.Flag;
  readonly parse?: (present: boolean) => unknown;

  constructor(props: FlagProps) {
    super(props);
    this.parse = props.parse;
  }

  static fromPrimitives(this: void, primitives: FlagPrimitives): Flag {
    return new Flag({
      ...BaseOption.parsePrimitives(primitives),
      parse: primitives.parse,
    });
  }
}
