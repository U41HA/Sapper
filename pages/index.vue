<template>
  <div class="wrapper wrapper-main mx-auto">
    <the-nav :data="store.levelList" v-model:currentLevel="currentLevel"></the-nav>
      <common-the-cell></common-the-cell>
      {{ currentLevel }}
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '~/store/index'
const store = mainStore()

const currentLevel = ref(store.levelList[0])
</script>

<style lang="scss" scoped>
.wrapper-main {
  max-width: $md;
  margin-top: 100px;
}
</style>