<script setup lang="ts">
import SignIn from '@/widgets/auth-form/ui/sign-in.vue';
import SignUp from '@/widgets/auth-form/ui/sign-up.vue';
import { NCard, NFlex, NTabPane, NTabs } from 'naive-ui';
</script>

<template>
  <n-flex justify="center" align="center" class="auth__wrapper">
    <n-card>
      <n-tabs default-value="Sign In" size="large" animated>
        <n-tab-pane name="Sign In">
          <sign-in />
        </n-tab-pane>

        <n-tab-pane name="Sign Up">
          <sign-up />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-flex>
</template>

<style lang="scss" scoped>
.auth__wrapper {
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  min-width: 600px;
  width: 30%;
}
</style>
