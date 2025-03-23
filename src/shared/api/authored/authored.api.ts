import { type SafeParseReturnType, type ZodSchema } from 'zod';
import { Api } from '@shared/api/base.api';
import type { LogoutResponse, TokensResponse } from '@shared/api/authored/schemas/dtos';
import { LogoutResponseSchema, TokensResponseSchema } from '@shared/api/authored/schemas/dtos';

const PATHS = {
  REFRESH_TOKENS: '/auth/refresh',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
} as const;

export class AuthoredApi extends Api {
  private token: string | null = null;
  private expiresAt: number | null = null;

  constructor(apiUrl: string) {
    super(apiUrl);
  }

  protected async refresh() {
    const response = await this.post<TokensResponse>(PATHS.REFRESH_TOKENS, TokensResponseSchema);

    if (response.success) {
      this.token = response.data.access_token;
      this.expiresAt = response.data.access_expires;
    }
  }

  public async login(email: string, password: string) {
    const response = await this.request<TokensResponse>(
      PATHS.LOGIN,
      TokensResponseSchema,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      true,
    );

    if (response.success) {
      this.token = response.data.access_token;
      this.expiresAt = response.data.access_expires;
    }
  }

  override async request<T>(
    path: string,
    zodSchema: ZodSchema,
    options?: RequestInit,
    skipAuth: boolean = false,
  ): Promise<SafeParseReturnType<unknown, T>> {
    if (!skipAuth) {
      if (!this.expiresAt) {
        await this.refresh();
      }

      if (this.expiresAt && Date.now() > this.expiresAt) {
        await this.refresh();
      }

      if (this.token && this.expiresAt && Date.now() < this.expiresAt) {
        options = {
          ...options,
          headers: {
            ...options?.headers,
            Authorization: `Bearer ${this.token}`,
          },
        };
      }
    }

    return super.request<T>(path, zodSchema, options);
  }

  public async logout() {
    await this.post<LogoutResponse>(PATHS.LOGOUT, LogoutResponseSchema);
  }
}
