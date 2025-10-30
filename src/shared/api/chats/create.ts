import { api } from '../axios';
import { withValidation } from '../common';

import { Chat } from './schema';

export const create = withValidation(
  Chat,
  async (channelId: string, name: string) => {
    const response = await api.post(`/channels/${channelId}/chats`, {
      name,
    });

    return response.data as unknown;
  },
);
