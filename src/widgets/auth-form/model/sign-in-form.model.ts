import { useAsyncValidator } from '@shared/ui/naive-ui/zod-integration/form-validation.integration';
import {
  EmailOrUsernameValidator,
  PasswordValidator,
} from '@shared/validators/user-data.validators';
import type { FormInst, FormRules } from 'naive-ui';
import { ref } from 'vue';

export const useSignInFormModel = () => {
  const formRef = ref<FormInst | undefined>(undefined);
  const model = ref({
    emailOrUsername: '',
    password: '',
  });
  const rules: FormRules = {
    emailOrUsername: {
      asyncValidator: useAsyncValidator(EmailOrUsernameValidator),
      trigger: 'input',
    },
    password: {
      asyncValidator: useAsyncValidator(PasswordValidator),
      trigger: 'input',
    },
  };

  return { model, rules, formRef };
};
