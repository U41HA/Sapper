<template>
  <div class="wrapper wrapper-main mx-auto">
    <the-nav :data="store.levelList" v-model:currentLevel="currentLevel"></the-nav>
    <the-field v-show="level.name === currentLevel.name" v-for="level in store.levelList" :level="level" ></the-field>
    {{ currentLevel }}
  </div>
</template>

<script setup lang="ts">

import { mainStore } from '~~/store'
const store = mainStore()

const currentLevel = ref(store.levelList[0])


// getMatrix()
</script>

<style lang="scss" scoped>
.wrapper-main {
  max-width: $md;
  margin-top: 100px;
}

.field {
  margin: 50px 0px;
  display: grid;
  justify-content: center;
}
</style>