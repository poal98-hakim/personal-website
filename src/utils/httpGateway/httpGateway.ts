import axios, { AxiosError, AxiosInstance } from 'axios';
import type { HttpGateway, HttpRequestConfig } from './httpGateway.model';
import { HttpError } from './httpGateway.model';

class AxiosHttpGateway implements HttpGateway {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          throw new HttpError(
            `HTTP Error: ${error.response.status}`,
            error.response.status,
            error.response.data,
            error
          );
        }

        if (error.request) {
          throw new HttpError('Network Error: No response received', undefined, undefined, error);
        }

        throw new HttpError('Request Error: Failed to setup request', undefined, undefined, error);
      }
    );
  }

  async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, this.mapConfig(config));
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, this.mapConfig(config));
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, this.mapConfig(config));
    return response.data;
  }

  async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, this.mapConfig(config));
    return response.data;
  }

  private mapConfig(config?: HttpRequestConfig) {
    if (!config) return {};

    return {
      headers: config.headers,
      timeout: config.timeout,
      params: config.params,
    };
  }
}

export const httpGateway: HttpGateway = new AxiosHttpGateway();
