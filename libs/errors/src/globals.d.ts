interface ErrorConstructor {
  captureStackTrace?(target: object, ctor?: abstract new (...args: never[]) => unknown): void;
}
