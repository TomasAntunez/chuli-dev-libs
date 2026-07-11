import { ValueObject } from './value-object.vo.js';

export abstract class Primitive<TValue extends string | number | boolean> extends ValueObject {
  protected readonly value: TValue;

  protected constructor(value: TValue) {
    super();
    this.value = value;
  }

  isEqualTo(other: this): boolean {
    return this.value === other.value;
  }
}
