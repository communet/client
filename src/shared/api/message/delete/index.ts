import * as z from 'zod';

import { withValidation } from '../../common';
import { api } from '../../axios';

import type { DeleteMessagePayload } from './types';

export const deleteMessage = withValidation(
  z.void(),
  async ({ channelId, chatId, messageId }: DeleteMessagePayload) => {
    const response = await api.delete(
      `/channels/${channelId}/chats/${chatId}/messages/${messageId}`,
    );

    return response.data as unknown;
  },
);
