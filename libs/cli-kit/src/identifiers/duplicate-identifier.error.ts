import { BusinessRuleError } from '@chuli-dev/errors';

export class DuplicateIdentifierError extends BusinessRuleError {
  constructor(identifier: string, key: string) {
    super(`Duplicate identifier: ${identifier}`, {
      metadata: { key },
    });
  }
}
