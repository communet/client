import type { FormItemRule } from 'naive-ui';
import { type ZodError, type ZodType } from 'zod';
import { fromError, type MessageBuilder } from 'zod-validation-error';

type ValidatorParamters = Parameters<Exclude<FormItemRule['validator'], undefined>>;

export type SuccessCallback = (...args: ValidatorParamters) => void;
export type ErrorCallback = (error: ZodError, ...args: ValidatorParamters) => void;

const messageBuilder: MessageBuilder = (issues) => {
  return issues[0]?.message;
};

export const useAsyncValidator =
  (validator: ZodType, onSuccess?: SuccessCallback, onErrror?: ErrorCallback) =>
  async (...[rule, value, ...args]: ValidatorParamters) => {
    const result = await validator.safeParseAsync(value);

    if (result.success) {
      if (onSuccess) onSuccess(rule, value, ...args);
    } else {
      if (onErrror) onErrror(result.error, rule, value, ...args);

      throw new Error(fromError(result.error, { messageBuilder }).toString());
    }
  };

export const useValidator =
  (validator: ZodType, onSuccess?: SuccessCallback, onErrror?: ErrorCallback) =>
  (...[rule, value, ...args]: ValidatorParamters) => {
    const result = validator.safeParse(value);

    if (result.success) {
      if (onSuccess) onSuccess(rule, value, ...args);
    } else {
      if (onErrror) onErrror(result.error, rule, value, ...args);

      throw new Error(fromError(result.error, { messageBuilder }).message);
    }
  };
