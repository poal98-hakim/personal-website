export interface HttpGateway {
  get<T>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<T>;
}

export interface HttpRequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, string | number>;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: unknown,
    public cause?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
