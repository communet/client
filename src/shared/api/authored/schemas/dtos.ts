import { z } from 'zod';

export const TokensResponseSchema = z.object({
  access_token: z.string(),
  access_expires: z
    .string()
    .datetime()
    .transform((value) => new Date(value).getTime())
    .refine((value) => Date.now() < value),
});

export type TokensResponse = z.infer<typeof TokensResponseSchema>;

export const LogoutResponseSchema = z.undefined();

export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;
