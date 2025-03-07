import { type SafeParseReturnType, type ZodSchema } from 'zod';
import { ServerError } from './errors/server.error';
import { NetworkError } from '../errors/network.error';
import { InternalServerError } from './errors/internal.error';
import { ForbiddenError } from './errors/forbidden.error';
import { UnauthorizedError } from './errors/unauthorized.error';
import { NotFoundError } from './errors/not-found.errors';
import { BadRequestError } from './errors/bad-request.error';

export class Api {
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
    } catch (error) {
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
