import * as z from 'zod';

import { withValidation } from '../common';
import { api } from '../axios';

export const deleteChat = withValidation(
  z.void(),
  async (channelId: string, chatId: string) => {
    const response = await api.delete(`/channels/${channelId}/chats/${chatId}`);

    return response.data as unknown;
  },
);
