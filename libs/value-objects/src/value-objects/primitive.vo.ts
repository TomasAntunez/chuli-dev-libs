import { ValueObject } from './value-object.vo.js';

export abstract class PrimitiveVo<T extends string | number | boolean> extends ValueObject {
  protected readonly value: T;

  protected constructor(value: T) {
    super();
    this.value = value;
  }

  isEqualTo(other: this): boolean {
    return other.constructor === this.constructor && this.value === other.value;
  }
}
