import { api } from '../axios';
import { withValidation } from '../common';

import { Channel } from './schemas';

export const getChannels = withValidation(Channel.array(), async () => {
  const response = await api.get(`/channels`);

  return response.data as unknown;
});
