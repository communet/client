<script setup lang="ts">
import { useAppStore } from '@app/stores/app.store';
import { NSpin } from 'naive-ui';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();

const { isLoading } = storeToRefs(appStore);
</script>

<template>
    <router-view></router-view>

    <div id="app-modals"></div>

    <div v-show="isLoading" class="app-loader">
      <n-spin size="large" />
    </div>
</template>

<style lang="scss">
#app-modals {
  position: absolute;
  top: 0;
  left: 0;
}

.app-loader {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--crust-color);
}
</style>
