import { ValueObject } from './value-object.vo.js';

export abstract class Primitive<T extends string | number | boolean> extends ValueObject {
  protected readonly value: T;

  protected constructor(value: T) {
    super();
    this.value = value;
  }

  isEqualTo(other: this): boolean {
    return this.value === other.value;
  }
}
