import * as z from 'zod';

export const Message = z.object({
  id: z.string(),
  content: z.string(),
  senderId: z.string(),
  chatId: z.string(),
  createdAt: z.iso.datetime().transform((value) => new Date(value)),
});
