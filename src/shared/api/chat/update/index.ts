import { api } from '../../axios';
import { withValidation } from '../../common';
import { Chat } from '../schema';

import type { UpdateChatPayload } from './types';

export const update = withValidation(
  Chat,
  async ({ channelId, chatId, name }: UpdateChatPayload) => {
    const response = await api.patch(`/channels/${channelId}/chats/${chatId}`, {
      name,
    });

    return response.data as unknown;
  },
);
