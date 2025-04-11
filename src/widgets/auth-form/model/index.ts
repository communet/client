import { useSignInFormModel } from '@/widgets/auth-form/model/sign-in-form.model';
import { useSignUpFormModel } from '@/widgets/auth-form/model/sign-up-form.model';
import { AuthoredApi } from '@shared/api/authored/authored.api';
import { ServerError } from '@shared/api/errors/server.error';
import { type MessageApi } from 'naive-ui';
import Container from 'typedi';

export const useSignInModel = () => {
  const formModel = useSignInFormModel();
  const authApi = Container.get(AuthoredApi);

  const signIn = async (message: MessageApi) => {
    try {
      await authApi.login(formModel.model.value.emailOrUsername, formModel.model.value.password);
    } catch (err) {
      if (err instanceof ServerError) {
        message.error(err.message);
        return;
      }

      message.error('Unknown error');
      console.error(err);
    }
  };

  return { formModel, signIn };
};

export const useSignUpModel = () => {
  const formModel = useSignUpFormModel();
  const authApi = Container.get(AuthoredApi);

  const handlePasswordEnter = () => {
    if (formModel.model.value.confirm.length) {
      formModel.confirmRef?.value?.validate({
        trigger: formModel.PASSWORD_INPUT_TRIGGER,
      });
    }
  };

  const signUp = async (message: MessageApi) => {
    try {
      await authApi.register(
        formModel.model.value.email,
        formModel.model.value.password,
        formModel.model.value.username,
      );
    } catch (err) {
      if (err instanceof ServerError) {
        message.error(err.message);
        return;
      }

      message.error('Unknown error');
      console.error(err);
    }
  };

  return { formModel, handlePasswordEnter, signUp };
};
