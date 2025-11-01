import * as z from 'zod';

export const Chat = z.object({
  id: z.string(),
  name: z.string(),
  channelId: z.string(),
});
