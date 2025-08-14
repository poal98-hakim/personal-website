import type { DomainErrorKind, Result } from './result.model';

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function err<T>(kind: DomainErrorKind, message: string, cause?: unknown): Result<T> {
  return { ok: false, error: { kind, message, cause } };
}
