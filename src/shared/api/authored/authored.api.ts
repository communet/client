import type { LoginDto } from '@/shared/api/authored/dto';
import type { LogoutResponse, TokensResponse } from '@shared/api/authored/schemas/dtos';
import { LogoutResponseSchema, TokensResponseSchema } from '@shared/api/authored/schemas/dtos';
import { Api } from '@shared/api/base.api';
import type { AxiosRequestConfig } from 'axios';
import { Service } from 'typedi';
import { type SafeParseReturnType, type ZodSchema } from 'zod';

const PATHS = {
  REFRESH_TOKENS: 'auth/refresh',
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  REGISTER: 'auth/register',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  VERIFY_EMAIL: 'auth/verify-email',
} as const;

@Service()
export class AuthoredApi extends Api {
  private token: string | null = null;
  private expiresAt: number | null = null;

  constructor() {
    super();
  }

  public get isLoggedIn() {
    return this.token && this.expiresAt && Date.now() < this.expiresAt;
  }

  public async register(email: string, password: string, username: string) {
    const response = await this.request<TokensResponse>(
      PATHS.REGISTER,
      TokensResponseSchema,
      {
        method: 'POST',
        data: { email, password, username },
      },
      true,
    );

    if (response.success) {
      this.token = response.data.access_token;
      this.expiresAt = response.data.access_expires;
    }
  }

  protected async refresh() {
    const response = await this.post<TokensResponse>(PATHS.REFRESH_TOKENS, TokensResponseSchema);

    if (response.success) {
      this.token = response.data.access_token;
      this.expiresAt = response.data.access_expires;
    }
  }

  public async login(dto: LoginDto) {
    const password = dto.password;
    const username = dto.username;
    const email = dto.email;

    const response = await this.request<TokensResponse>(
      PATHS.LOGIN,
      TokensResponseSchema,
      {
        method: 'POST',
        data: { email, password, username },
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
    config?: AxiosRequestConfig,
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
        config = {
          ...config,
          headers: {
            ...config?.headers,
            Authorization: `Bearer ${this.token}`,
          },
        };
      }
    }

    return super.request<T>(path, zodSchema, config);
  }

  public async logout() {
    await this.post<LogoutResponse>(PATHS.LOGOUT, LogoutResponseSchema);
  }
}
