import * as z from 'zod';

import { ResponseErrorSchema, ResponseOkSchema } from './schemas';

export const withValidation = <Args, Schema extends z.ZodType>(
  schema: Schema,
  fn: (...args: Args[]) => Promise<unknown>,
) => {
  const ResponseSchema = z.discriminatedUnion('error', [
    ResponseErrorSchema,
    ResponseOkSchema.extend({ data: schema }),
  ]);

  return async (...args: Args[]): Promise<z.infer<typeof ResponseSchema>> => {
    const fnResult = await fn(...args);

    const result = ResponseSchema.parse(fnResult);

    return result;
  };
};
