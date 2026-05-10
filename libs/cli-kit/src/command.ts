import type { Text } from '@chuli-dev/value-objects';

import type { ArgumentList } from './argument-list.vo.js';
import type { Identifier } from './identifier.vo.js';
import type { OptionList } from './option-list.vo.js';

export abstract class Command {
  abstract readonly name: Identifier;
  abstract readonly description?: Text;
  abstract readonly arguments?: ArgumentList;
  abstract readonly options?: OptionList;

  abstract execute(): Promise<void>;
}
