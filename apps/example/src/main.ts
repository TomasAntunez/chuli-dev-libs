import {
  AuthenticationError,
  AuthorizationError,
  BaseError,
  ExternalServiceError,
  NotFoundError,
  ValidationError,
} from '@chuli-dev/errors';

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
