import { api } from '../axios';
import { withValidation } from '../common';

import { Chat } from './schema';

export const getChats = withValidation(
  Chat.array(),
  async (channelId: string) => {
    const response = await api.get(`/channels/${channelId}/chats`);

    return response.data as unknown;
  },
);
