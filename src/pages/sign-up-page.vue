<script setup lang="ts">
import SignUp from '@features/auth-form/ui/sign-up.vue';
import { NButton, NCard, NFlex } from 'naive-ui';
</script>

<template>
  <n-flex justify="center" align="center" class="sign-up__wrapper">
    <n-card class="sign-up__card" title="Sign Up">
      <sign-up />

      <template #action>
        <n-flex justify="end">
          <n-button>Sign Up</n-button>
        </n-flex>
      </template>
    </n-card>
  </n-flex>
</template>

<style lang="scss" scoped>
.sign-up {
  &__card {
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
  }

  &__wrapper {
    height: 100%;
  }
}
</style>
