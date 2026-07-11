export const parseOptional = <TValue, TParsed>(
  value: TValue | undefined,
  fn: (value: TValue) => TParsed,
): TParsed | undefined => {
  return value !== undefined ? fn(value) : undefined;
};
