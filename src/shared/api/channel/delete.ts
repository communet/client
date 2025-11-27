import * as z from 'zod';

import { withValidation } from '../common';
import { api } from '../axios';

export const deleteChannel = withValidation(
  z.void(),
  async (channelId: string) => {
    const response = await api.delete(`/channels/${channelId}`);

    return response.data as unknown;
  },
);
