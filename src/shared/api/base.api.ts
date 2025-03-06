import { type SafeParseReturnType, type ZodSchema } from 'zod';

export class Api {
  constructor(private readonly apiUrl: string) {}

  protected async request<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
  ): Promise<SafeParseReturnType<unknown, T>> {
    const response = await fetch(`${this.apiUrl}${path}`, options);

    const data = await response.json();

    return zodSchema.safeParseAsync(data);
  }

  protected async get<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'GET' });
  }

  protected async post<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'POST' });
  }

  protected async put<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'PUT' });
  }

  protected async delete<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'DELETE' });
  }
}
