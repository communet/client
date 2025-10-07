import * as z from 'zod';

export const Channel = z.object({
  id: z.string(),
  name: z.string(),
  creatorId: z.string(),
});
