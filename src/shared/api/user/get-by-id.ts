import { api } from '../axios';
import { withValidation } from '../common';

import { User } from './schema';

export const getById = withValidation(User, async (id: string) => {
  const response = await api.get(`/users/${id}`);

  return response.data as unknown;
});
