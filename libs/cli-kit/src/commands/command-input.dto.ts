import type { InputValues } from '../shared/input-values.dto.js';

export interface CommandInput<
  TArgs extends InputValues = InputValues,
  TOptions extends InputValues = InputValues,
> {
  args: TArgs;
  options: TOptions;
}
