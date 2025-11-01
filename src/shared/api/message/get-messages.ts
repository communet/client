import { api } from '../axios';
import { withValidation } from '../common';

import { Message } from './schema';

export const getMessages = withValidation(
  Message.array(),
  async (channelId: string, chatId: string) => {
    const response = await api.get(
      `/channels/${channelId}/chats/${chatId}/messages`,
    );

    return response.data as unknown;
  },
);
