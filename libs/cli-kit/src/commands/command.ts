import type { CommandConfig } from './command-config.vo.js';
import type { CommandInput } from './command-input.dto.js';

export abstract class Command<TInput extends CommandInput = CommandInput> {
  abstract readonly config: CommandConfig<TInput>;

  abstract execute(input: TInput): Promise<void> | void;
}
