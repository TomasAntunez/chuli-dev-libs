export interface BaseErrorOptions extends ErrorOptions {
  code?: string;
  metadata?: Record<string, unknown>;
}

export abstract class BaseError extends Error {
  readonly code?: string;
  readonly metadata?: Record<string, unknown>;

  constructor(message: string, options: BaseErrorOptions = {}) {
    super(message, options);
    this.name = new.target.name;

    if (options.code !== undefined) {
      this.code = options.code;
    }
    if (options.metadata !== undefined) {
      this.metadata = options.metadata;
    }

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, new.target);
    }
  }
}
