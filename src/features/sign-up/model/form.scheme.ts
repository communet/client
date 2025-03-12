import { onlyAlphaNumeric } from '@/features/sign-up/model/validators';
import { z } from 'zod';

export const SignUpScheme = z
  .object({
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, 'User name must be greater or equal 3 characters')
      .max(32, 'User name must be less or equal 32 characters')
      .refine(onlyAlphaNumeric, 'User name must contains symbols A-z, 0-9 and _ (underscore)'),
    password: z.string().min(8, 'Password must be greater or equal 8 characters'),
    confirm: z.string(),
  })
  .refine((value) => value.password === value.confirm, {
    message: "Passwords doesn't match",
    path: ['confirm'],
  });
