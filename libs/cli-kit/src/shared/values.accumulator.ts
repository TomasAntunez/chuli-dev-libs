import type { InputValues } from './input-values.dto.js';

export class ValuesAccumulator {
  private readonly values: InputValues = {};

  has(key: string): boolean {
    return key in this.values;
  }

  set(key: string, value: unknown): void {
    this.values[key] = value;
  }

  append(key: string, value: unknown): void {
    const current = this.values[key];

    if (Array.isArray(current)) {
      current.push(value);
    } else {
      this.values[key] = [value];
    }
  }

  toValues(): InputValues {
    return this.values;
  }
}
