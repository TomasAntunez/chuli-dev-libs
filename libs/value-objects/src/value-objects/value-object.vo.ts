declare const valueObjectBrand: unique symbol;

export abstract class ValueObject {
  declare protected readonly [valueObjectBrand]: never;
}
