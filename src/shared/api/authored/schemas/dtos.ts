import { z } from 'zod';

export const RefreshTokensSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.number().int().positive(),
});

export type RefreshTokensDto = z.infer<typeof RefreshTokensSchema>;

export const LoginSchema = z.object({
  accessToken: z.string(),
  expiresAt: z.number().int().positive(),
});

export type LoginDto = z.infer<typeof LoginSchema>;

export const LogoutSchema = z.undefined();

export type LogoutDto = z.infer<typeof LogoutSchema>;
