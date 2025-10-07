import { api } from '../axios';
import { withValidation } from '../common';

import { User } from './schemas';

export const getMe = withValidation(User, async () => {
  const response = await api.get(`/users/me`);

  return response.data as unknown;
});
