<script setup lang="ts">
import { useSignUpModel } from '@/features/auth-form/model';
import { NForm, NFormItem, NInput } from 'naive-ui';

const {
  formModel: { confirmRef, model, rules },
  handlePasswordEnter,
} = useSignUpModel();
</script>

<template>
  <n-form :model="model" :rules="rules">
    <n-form-item path="email" title="Email">
      <n-input
        v-model:value="model.email"
        :input-props="{
          autocomplete: 'disabled',
        }"
        placeholder="Enter email"
      />
    </n-form-item>
    <n-form-item path="username" title="Username">
      <n-input
        v-model:value="model.username"
        :input-props="{
          autocomplete: 'disabled',
        }"
        placeholder="Enter username"
      />
    </n-form-item>
    <n-form-item path="password" title="Password">
      <n-input
        v-model:value="model.password"
        type="password"
        placeholder="Enter password"
        show-password-on="click"
        @input="handlePasswordEnter"
      />
    </n-form-item>
    <n-form-item ref="confirmRef" path="confirm" title="Password confirmation">
      <n-input
        v-model:value="model.confirm"
        type="password"
        placeholder="Re-enter password"
        show-password-on="click"
      />
    </n-form-item>
  </n-form>
</template>
