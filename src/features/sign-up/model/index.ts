import { useFormModel } from '@features/sign-up/model/form.model';

export const useSignUpModel = () => {
  const formModel = useFormModel();

  const handlePasswordEnter = () => {
    if (formModel.model.value.confirm.length) {
      formModel.confirmRef?.value?.validate({
        trigger: formModel.PASSWORD_INPUT_TRIGGER,
      });
    }
  };

  return { formModel, handlePasswordEnter };
};
