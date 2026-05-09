import {
  AuthenticationError,
  AuthorizationError,
  BaseError,
  ExternalServiceError,
  NotFoundError,
  ValidationError,
} from '@chuli-dev/errors';
import {
  Decimal,
  Integer,
  InvalidValueError,
  PositiveInteger,
  Text,
  Uuid,
} from '@chuli-dev/value-objects';

const tryThrow = (fn: () => unknown): void => {
  try {
    fn();
  } catch (err) {
    if (err instanceof BaseError) {
      console.log(`[${err.name}] ${err.message}`);
      if (err.code !== undefined) {
        console.log(`  code: ${err.code}`);
      }
      if (err.metadata !== undefined) {
        console.log(`  metadata:`, err.metadata);
      }
      if (err.cause !== undefined) {
        console.log(`  cause:`, err.cause);
      }
    } else {
      console.log('unknown error', err);
    }
  }
};

tryThrow(() => {
  throw new ValidationError('email is not a valid format', {
    code: 'INVALID_EMAIL',
    metadata: { field: 'email', value: 'not-an-email' },
  });
});

tryThrow(() => {
  throw new NotFoundError('User not found', {
    code: 'USER_NOT_FOUND',
    metadata: { id: 'u_123' },
  });
});

tryThrow(() => {
  throw new AuthenticationError('Invalid credentials', {
    code: 'INVALID_CREDENTIALS',
  });
});

tryThrow(() => {
  throw new AuthorizationError('User cannot cancel this order', {
    code: 'CANNOT_CANCEL_ORDER',
    metadata: { userId: 'u_123', orderId: 'o_456' },
  });
});

tryThrow(() => {
  const lowLevel = new Error('ECONNREFUSED 127.0.0.1:5432');
  throw new ExternalServiceError('Payments API unreachable', {
    code: 'PAYMENTS_UNREACHABLE',
    metadata: { service: 'payments', attempt: 3 },
    cause: lowLevel,
  });
});

const err = new ValidationError('name is required');
console.log('\ndiscriminación por instanceof:');
console.log(`  err instanceof ValidationError: ${String(err instanceof ValidationError)}`);
console.log(`  err instanceof BaseError:       ${String(err instanceof BaseError)}`);
console.log(`  err instanceof Error:           ${String(err instanceof Error)}`);
console.log(`  err.name:                       ${err.name}`);

console.log('\n=== Value Objects ===');

const id = Uuid.create();
const name = Text.fromString('  Tomas  ');
const price = Decimal.fromNumber(19.99);
const quantity = PositiveInteger.fromNumber(3);

console.log(`id:       ${id.toString()}`);
console.log(`name:     "${name.toString()}" (trimmed)`);
console.log(`price:    ${price.toString()}`);
console.log(`quantity: ${quantity.toString()}`);

const a = Text.fromString('hello');
const b = Text.fromString('hello');
console.log('\nigualdad estructural:');
console.log(`  a === b:        ${String(a === b)}`);
console.log(`  a.isEqualTo(b): ${String(a.isEqualTo(b))}`);

console.log('\nInvalidValueError instanceof cross-package:');
try {
  Integer.fromString('not-a-number');
} catch (e) {
  if (e instanceof InvalidValueError) {
    console.log(`  e instanceof InvalidValueError: true`);
    console.log(`  e instanceof ValidationError:   ${String(e instanceof ValidationError)}`);
    console.log(`  e instanceof BaseError:         ${String(e instanceof BaseError)}`);
    console.log(`  e.metadata:`, e.metadata);
  }
}
