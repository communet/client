import { getMe } from './get-me';
import { getUserById } from './get-user-by-id';

export const user = {
  getById: getUserById,
  getMe,
};
