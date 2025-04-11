<script setup lang="ts">
import App from '@app/app.vue';
import {
  darkTheme,
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NNotificationProvider,
} from 'naive-ui';
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-notification-provider>
      <n-message-provider>
        <app />
        <n-global-style />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
