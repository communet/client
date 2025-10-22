import { api } from '../axios';
import { withValidation } from '../common';

import { User } from './schema';

export const getMe = withValidation(User, async () => {
  const response = await api.get(`/users/me`);

  return response.data as unknown;
});
