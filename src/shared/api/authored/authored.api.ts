import { type SafeParseReturnType, type ZodSchema } from 'zod';
import { Api } from '@/shared/api/base.api';
import type { LoginDto, LogoutDto, RefreshTokensDto } from '@/shared/api/authored/schemas/dtos';
import { LoginSchema, LogoutSchema, RefreshTokensSchema } from '@/shared/api/authored/schemas/dtos';

const PATHS = {
  REFRESH_TOKENS: '/auth/refresh-tokens',
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

  protected async refreshTokens() {
    const response = await this.post<RefreshTokensDto>(PATHS.REFRESH_TOKENS, RefreshTokensSchema);

    if (response.success) {
      this.token = response.data.accessToken;
      this.expiresAt = response.data.expiresAt;
    }
  }

  public async login(email: string, password: string) {
    const response = await this.request<LoginDto>(
      PATHS.LOGIN,
      LoginSchema,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      true,
    );

    if (response.success) {
      this.token = response.data.accessToken;
      this.expiresAt = response.data.expiresAt;
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
        await this.refreshTokens();
      }

      if (this.expiresAt && Date.now() > this.expiresAt) {
        await this.refreshTokens();
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
    await this.post<LogoutDto>(PATHS.LOGOUT, LogoutSchema);
  }
}
