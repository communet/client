import { BadRequestError } from '@/shared/api/errors/bad-request.error';
import { ForbiddenError } from '@/shared/api/errors/forbidden.error';
import { InternalServerError } from '@/shared/api/errors/internal.error';
import { NotFoundError } from '@/shared/api/errors/not-found.errors';
import { ServerError } from '@/shared/api/errors/server.error';
import { UnauthorizedError } from '@/shared/api/errors/unauthorized.error';
import { NetworkError } from '@/shared/errors/network.error';
import { type SafeParseReturnType, type ZodSchema } from 'zod';

export abstract class Api {
  constructor(private readonly apiUrl: string) {}

  protected async request<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
  ): Promise<SafeParseReturnType<unknown, T>> {
    let response: Response;
    const url = new URL(path, this.apiUrl);

    try {
      response = await fetch(url, options);
    } catch {
      throw new NetworkError('Network error');
    }

    this.handleErrors(response);

    const data = await response.json();

    return zodSchema.safeParseAsync(data);
  }

  private handleErrors(response: Response) {
    switch (response.status) {
      case 400:
        throw new BadRequestError('Bad request');
      case 401:
        throw new UnauthorizedError('Unauthorized');
      case 403:
        throw new ForbiddenError('Forbidden');
      case 404:
        throw new NotFoundError('Not found');
      case 500:
        throw new InternalServerError('Internal server error');
      default:
        throw new ServerError('Server error');
    }
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
