import { api } from '../../axios';
import { withValidation } from '../../common';
import { Message } from '../schema';

import type { CreateMessagePayload } from './types';

export const create = withValidation(
  Message,
  async ({ channelId, chatId, content }: CreateMessagePayload) => {
    const response = await api.post(
      `/channels/${channelId}/chats/${chatId}/messages`,
      {
        content,
      },
    );

    return response.data as unknown;
  },
);
