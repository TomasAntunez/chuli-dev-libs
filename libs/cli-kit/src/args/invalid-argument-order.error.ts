import { BusinessRuleError } from '@chuli-dev/errors';

export class InvalidArgumentOrderError extends BusinessRuleError {
  constructor(message: string, metadata: { name: string; key: string }) {
    super(message, { metadata });
  }
}
