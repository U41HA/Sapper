<template>
  <div class="wrapper wrapper-main mx-auto">
    <the-nav :data="store.levelList" v-model:currentLevel="currentLevel"></the-nav>
    <the-field v-show="level.name === currentLevel.name" v-for="level in store.levelList" :level="level"></the-field>
    <div class="d-flex flex-column ">
      <v-btn class="mt-5 pa-4 d-flex font-14-600" @click="newGame(currentLevel)">Перезапустить игру</v-btn>
      <inputs-text-input v-model="inputValue" :placeholder="'Введите имя игрока'" :disabled="!currentLevel.firstClick"
        class="input text-input"></inputs-text-input>
    </div>

    <ul class="record__list d-flex flex-column" v-if="recordList?.length">
      <li>
        <h3 class="font-20-800 record__title">
          Рекорды
        </h3>
      </li>
      <li v-for="record in recordList" class="record__item">
        <common-record-item :data="record"></common-record-item>
      </li>
    </ul>
    <modal-the-result :level="currentLevel"></modal-the-result>
  </div>
</template>

<script setup lang="ts">

import { IRecord, Level } from '~~/interface';
import { mainStore } from '~~/store'
const store = mainStore()

const currentLevel = ref(store.levelList[0])
const recordList = computed(() => store.recordList?.sort((a: any, b: any) => { return a.time - b.time }).filter((item: IRecord, index) => index <= 9))

onMounted(() => {
  store.updateRecordList()
})
function newGame(currentLevel: Level) {
  store.newGame(currentLevel)
}

const inputValue = ref('')

watch(inputValue, () => {
  store.updateUserName(inputValue.value)
})

// getMatrix()
</script>

<style lang="scss" scoped>
.wrapper-main {
  max-width: fit-content;
  padding: 50px 0px;
}

.input {
  margin-top: 20px;
}

.record__title {
  text-align: center;
  margin: 10px 0px;
}

.record__list {
  width: 100%;
  gap: 15px;
  margin-top: 20px;
}
</style>