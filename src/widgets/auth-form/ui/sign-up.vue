<script setup lang="ts">
import { useSignUpModel } from '@/widgets/auth-form/model';
import { NButton, NFlex, NForm, NFormItem, NInput, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

const message = useMessage();
const {
  formModel: { confirmRef, model, rules, formRef },
  handlePasswordEnter,
  signUp,
} = useSignUpModel();
const router = useRouter();

const onSingUpButtonClick = async () => {
  const validationResult = await formRef.value?.validate();

  if (validationResult?.warnings) {
    return;
  }

  await signUp(message);
  router.replace({ name: 'home' });
};
</script>

<template>
  <n-form :model="model" :rules="rules" :show-label="false" ref="formRef">
    <n-form-item path="email" title="Email" label="Email" :show-label="true">
      <n-input
        v-model:value="model.email"
        :input-props="{
          autocomplete: 'no-autofill-please',
        }"
        placeholder="Enter email"
      />
    </n-form-item>

    <n-form-item path="username" title="Username" label="Username" :show-label="true">
      <n-input
        v-model:value="model.username"
        :input-props="{
          autocomplete: 'no-autofill-please',
        }"
        placeholder="Enter username"
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
        @input="handlePasswordEnter"
      />
    </n-form-item>

    <n-form-item
      ref="confirmRef"
      path="confirm"
      title="Password confirmation"
      label="Password confrim"
      :show-label="true"
    >
      <n-input
        v-model:value="model.confirm"
        type="password"
        placeholder="Re-enter password"
        show-password-on="click"
      />
    </n-form-item>

    <n-flex justify="end">
      <n-form-item>
        <n-button type="primary" secondary @click="onSingUpButtonClick">Sign Up</n-button>
      </n-form-item>
    </n-flex>
  </n-form>
</template>
