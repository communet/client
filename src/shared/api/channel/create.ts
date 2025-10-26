import { api } from '../axios';
import { withValidation } from '../common';

import { Channel } from './schema';

export const create = withValidation(Channel, async (name: string) => {
  const channel = await api.post('/channels', { name });

  return channel.data as unknown;
});
