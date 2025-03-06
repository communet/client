<script setup lang="ts">
import App from '@app/app.vue';
import { darkTheme } from 'naive-ui';
import { NConfigProvider, NGlobalStyle, NNotificationProvider } from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider>
      <app />
      <n-global-style />
    </n-notification-provider>
  </n-config-provider>
</template>
