<template>
  <div class="wrapper wrapper-main mx-auto">
    <the-nav :data="store.levelList" v-model:currentLevel="currentLevel"></the-nav>
    <div v-show="level.name === currentLevel.name" v-for="level in store.levelList" class="field" :style="`grid-template-columns: repeat(${level.line}, 30px); grid-template-rows: repeat(${level.column}, 30px);`">
      <template v-for="column, index in field">
        <common-the-cell v-for="line, index2 in column" :row-index="index" :column-index="index2"></common-the-cell>
      </template>
    </div>
      {{ currentLevel }}
      {{ `${field[0].length} на ${field.length}`}}
      {{ field }}
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '~/store/index'
const store = mainStore()

const currentLevel = ref(store.levelList[0])
const field = computed(() => new Array(currentLevel.value.column).fill(new Array(currentLevel.value.line).fill(2)))
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