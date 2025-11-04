import { api } from '../../axios';
import { withValidation } from '../../common';
import { Message } from '../schema';

import type { UpdateMessagePayload } from './types';

export const update = withValidation(
  Message,
  async ({ channelId, chatId, messageId, content }: UpdateMessagePayload) => {
    const response = await api.patch(
      `/channels/${channelId}/chats/${chatId}/messages/${messageId}`,
      {
        content,
      },
    );

    return response.data as unknown;
  },
);
