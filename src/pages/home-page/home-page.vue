<script setup lang="ts">
// import { AuthoredApi } from '@/shared/api/authored/authored.api';
import { NFlex, NImage, NText } from 'naive-ui';
// import Container from 'typedi';

// const authApi = Container.get(AuthoredApi);

// authApi.login('user@example.com', 'bebrovich@');
</script>

<template>
  <n-flex align="center" justify="center" vertical size="small" class="app-page__home">
    <n-image class="app-home__logo" height="300" src="/dlp-meme.png" />
    <n-text>Welcome to Cyper Shield</n-text>
    <n-text>Start from settings to setup your client</n-text>
  </n-flex>
</template>

<style scoped lange="scss">
.app-page__home {
  padding: 32px;

  .app-home__logo {
    border-radius: 16px;
  }
}
</style>
