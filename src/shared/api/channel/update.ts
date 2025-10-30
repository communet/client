import { withValidation } from '../common';
import { api } from '../axios';

import { Channel } from './schema';

export const update = withValidation(
  Channel,
  async (channelId: string, name: string) => {
    const response = await api.patch(`/channels/${channelId}`, { name });

    return response.data as unknown;
  },
);
