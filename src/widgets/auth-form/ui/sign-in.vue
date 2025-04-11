<script setup lang="ts">
import { useSignInModel } from '@/widgets/auth-form/model';
import { NButton, NFlex, NForm, NFormItem, NInput, useMessage } from 'naive-ui';

const message = useMessage();
const {
  formModel: { model, rules, formRef },
  signIn,
} = useSignInModel();

const onSignInButtonClick = async () => {
  const validationResult = await formRef.value?.validate();

  if (validationResult) {
    return;
  }

  await signIn(message);
};
</script>

<template>
  <n-form :model="model" :rules="rules" :show-label="false" ref="formRef">
    <n-form-item
      path="emailOrUsername"
      title="Email or username"
      label="Email or username"
      :show-label="true"
    >
      <n-input
        v-model:value="model.emailOrUsername"
        :input-props="{
          autocomplete: 'no-autofill-please',
        }"
        placeholder="Enter email"
      />
    </n-form-item>

    <n-form-item path="password" title="Password" label="Password" :show-label="true">
      <n-input
        v-model:value="model.password"
        :input-props="{
          autocomplete: 'new-password',
        }"
        type="password"
        placeholder="Enter password"
        show-password-on="click"
      />
    </n-form-item>

    <n-flex justify="end">
      <n-form-item>
        <n-button type="primary" secondary @click="onSignInButtonClick">Sign In</n-button>
      </n-form-item>
    </n-flex>
  </n-form>
</template>
