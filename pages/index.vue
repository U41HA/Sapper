<template>
  <div class="wrapper wrapper-main mx-auto">
    <the-nav :data="store.levelList" v-model:currentLevel="currentLevel"></the-nav>
    <the-field v-show="level.name === currentLevel.name" v-for="level in store.levelList" :level="level"></the-field>
    <div class="d-flex flex-column interface">
      <v-btn class="mt-5 pa-4 d-flex font-14-600" @click="newGame(currentLevel)">Перезапустить игру</v-btn>
      <inputs-text-input :type="'text'" v-model="inputValue" :placeholder="'Введите имя игрока'"
        :disabled="!currentLevel.firstClick" class="input text-input"></inputs-text-input>
    </div>
    <transition name="fade">
      <div class="record__container" v-if="recordList?.length">
        <div class="record__head">
          <span></span>
          <h3 class="font-20-800 record__title">
            Рекорды
          </h3>
          <button class="button__remove font-12-500" @click="cleanRecordList()">Очистить</button>
        </div>
        <ul class="record__list d-flex flex-column">
          <li v-for="record in recordList" class="record__item">
            <common-record-item :data="record"></common-record-item>
          </li>
        </ul>
      </div>
    </transition>

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

function cleanRecordList() {
  localStorage.removeItem('recordList')
  store.cleanRecordList()
}
</script>

<style lang="scss" scoped>
.wrapper-main {
  max-width: fit-content;
  padding: 50px 10px;
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

.record__head {
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
}

.button__remove {
  align-self: flex-end;
  color: $color-red-200;
  border-bottom: 1px solid transparent;
  max-width: fit-content;
  padding-bottom: 2px;
  margin-left: auto;
  transition: border-bottom 0.3s;

  &:hover {
    border-bottom: 1px solid $color-red-200;
    transition: border-bottom 0.3s;
  }
}
</style>