export type DomainErrorKind = 'Network' | 'NotFound' | 'Validation' | 'Unknown';

export type DomainError = {
  kind: DomainErrorKind;
  message: string;
  cause?: unknown;
};

export type Result<T> = { ok: true; data: T } | { ok: false; error: DomainError };
