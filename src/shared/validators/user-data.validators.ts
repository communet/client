import { onlyAlphaNumeric } from '@shared/validators/custom.validators';
import { z } from 'zod';

export const UsernameValidator = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, 'User name must be greater or equal 3 characters')
  .max(32, 'User name must be less or equal 32 characters')
  .refine(onlyAlphaNumeric, 'User name must contains symbols A-z, 0-9 and _ (underscore)');

export const EmailValidator = z.string().trim().email();

export const PasswordValidator = z
  .string()
  .min(8, 'Password must be greater or equal 8 characters');

export const EmailOrUsernameValidator = z.union([UsernameValidator, EmailValidator]);
