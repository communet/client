import { type SafeParseReturnType, type ZodSchema } from 'zod';
import { Api } from '../base.api';
import { LoginSchema, LogoutSchema, RefreshTokensSchema } from './schemas/dtos';
import type { LoginDto, LogoutDto, RefreshTokensDto } from './schemas/dtos';

export class AuthoredApi extends Api {
  public static readonly PATHS = {
    REFRESH_TOKENS: '/auth/refresh-tokens',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  };

  private token: string | null = null;
  private expiresAt: number | null = null;

  constructor(apiUrl: string) {
    super(apiUrl);
  }

  protected async refreshTokens() {
    const response = await this.post<RefreshTokensDto>(
      AuthoredApi.PATHS.REFRESH_TOKENS,
      RefreshTokensSchema,
    );

    if (response.success) {
      this.token = response.data.accessToken;
      this.expiresAt = response.data.expiresAt;
    }
  }

  public async login(email: string, password: string) {
    const response = await this.request<LoginDto>(
      AuthoredApi.PATHS.LOGIN,
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

    return super.request<T>(path, zodSchema, options);
  }

  public async logout() {
    await this.post<LogoutDto>(AuthoredApi.PATHS.LOGOUT, LogoutSchema);
  }
}
