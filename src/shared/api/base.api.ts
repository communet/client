import { BadRequestError } from '@/shared/api/errors/bad-request.error';
import { ForbiddenError } from '@/shared/api/errors/forbidden.error';
import { InternalServerError } from '@/shared/api/errors/internal.error';
import { NotFoundError } from '@/shared/api/errors/not-found.errors';
import { ServerError } from '@/shared/api/errors/server.error';
import { UnauthorizedError } from '@/shared/api/errors/unauthorized.error';
import { NetworkError } from '@/shared/errors/network.error';
import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { Service } from 'typedi';
import { type SafeParseReturnType, type ZodSchema } from 'zod';
import { Config } from '@/shared/config/config';

export abstract class IApi {
  abstract request<T, D>(
    path: string,
    zodSchema: ZodSchema,
    config?: AxiosRequestConfig<D>,
    skipAuth?: boolean,
  ): Promise<SafeParseReturnType<unknown, T>>;

  abstract get<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig<T>, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>>;

  abstract post<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig<T>, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>>;

  abstract put<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig<T>, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>>;

  abstract delete<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig<T>, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>>;
}

@Service()
export class Api implements IApi {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: Config.apiUrl,
    withCredentials: true,
  });

  async request<T>(
    path: string,
    zodSchema: ZodSchema,
    config?: AxiosRequestConfig,
  ): Promise<SafeParseReturnType<unknown, T>> {
    let response: AxiosResponse<T>;

    try {
      response = await this.axios<T>({ url: path, ...config });
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        this.handleErrors(err.response);
      }

      throw new NetworkError('Network error');
    }

    return zodSchema.safeParseAsync(response.data);
  }

  private handleErrors(response: AxiosResponse) {
    switch (response.status) {
      case 400:
        throw new BadRequestError(response.data.message || 'Bad request');
      case 401:
        throw new UnauthorizedError(response.data.message || 'Unauthorized');
      case 403:
        throw new ForbiddenError(response.data.message || 'Forbidden');
      case 404:
        throw new NotFoundError(response.data.message || 'Not found');
      case 500:
        throw new InternalServerError(response.data.message || 'Internal server error');
      default:
        throw new ServerError(response.data.message || 'Server error');
    }
  }

  async get<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'GET' });
  }

  async post<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'POST' });
  }

  async put<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'PUT' });
  }

  async delete<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: Omit<AxiosRequestConfig, 'method'>,
  ): Promise<SafeParseReturnType<unknown, T>> {
    return this.request(path, zodSchema, { ...options, method: 'DELETE' });
  }
}
