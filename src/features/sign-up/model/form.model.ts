import type { FormInst } from 'naive-ui';
import { ref } from 'vue';

export const useFormModel = () => {
  const reference = ref<FormInst | null>(null);
  const model = ref({
    username: '',
    email: '',
    password: {
      base: '',
      repeated: '',
    },
  });
  const rules = {
    username: {},
  };

  return { reference, model, rules };
};
