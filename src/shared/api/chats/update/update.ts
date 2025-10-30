import { api } from '../../axios';
import { withValidation } from '../../common';
import { Chat } from '../schema';

import type { UpdateChatParams } from './types';

export const update = withValidation(
  Chat,
  async ({ channelId, chatId, name }: UpdateChatParams) => {
    const response = await api.patch(`/channels/${channelId}/chats/${chatId}`, {
      name,
    });

    return response.data as unknown;
  },
);
