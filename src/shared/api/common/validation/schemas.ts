import * as z from 'zod';

export const ResponseErrorSchema = z.object({
  error: z.literal(true),
  reason: z.string().array(),
  // TODO: rework to union type with union of supported server codes
  code: z.string(),
});

export const ResponseOkSchema = z.object({
  error: z.literal(false),
  data: z.any(),
});
