import { useAsyncValidator } from '@shared/ui/naive-ui/zod-integration/form-validation.integration';
import {
  EmailValidator,
  PasswordValidator,
  UsernameValidator,
} from '@shared/validators/user-data.validators';
import type { FormItemInst, FormRules } from 'naive-ui';
import { ref } from 'vue';

export const useFormModel = () => {
  const PASSWORD_INPUT_TRIGGER = 'password-input';
  const confirmRef = ref<FormItemInst | undefined>(undefined);
  const model = ref({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const rules: FormRules = {
    username: {
      asyncValidator: useAsyncValidator(UsernameValidator),
      trigger: 'input',
    },
    email: {
      asyncValidator: useAsyncValidator(EmailValidator),
      trigger: 'input',
    },
    password: {
      asyncValidator: useAsyncValidator(PasswordValidator),
      trigger: 'input',
    },
    confirm: {
      asyncValidator: async (_item, value) => {
        if (value !== model.value.password) {
          throw new Error('Password is not same as re-entered password!');
        }
      },
      trigger: ['input', PASSWORD_INPUT_TRIGGER],
    },
  };

  return { confirmRef, PASSWORD_INPUT_TRIGGER, model, rules };
};
