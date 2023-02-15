<template>
  <div>
    <div class="field"
      :style="`grid-template-columns: repeat(${props.level.line}, 30px); grid-template-rows: repeat(${props.level.column}, 30px);`"
      @click="store.openCell(level, clickTarget)" @click.right.prevent="disableButton(props.level, clickTarget)">
      <template v-for="column, indexX in props.level.matrix">
        <common-the-cell v-for="cell, indexY in column" :row-index="indexX" :column-index="indexY" :key="indexY"
          :data="cell" v-model:clickTarget="clickTarget" :level="props.level" class="cell" :class="{ 'disabled': cell.isDisabled }">
        </common-the-cell>
      </template>
    </div>
    <div class="statistic mt-10 font-14-600 d-flex align-center justify-center">
      <div class="statistic__item mr-5">
        <span class="flag__icon"></span>
        <p>
          Кол-во флагов: {{ props.level.flagsCount }}
        </p>
      </div>
      <div class="statistic__item">
        <span class="clock__icon"></span>
        <p v-if="store.gameTime">
          Время:
          {{ convertStampToTime(store.gameTime) }}
        </p>
        <p v-else>
          Время:
          {{ '00:00' }}
        </p>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import { convertStampToTime } from '~~/helpers/convertStampToTime';
import { Level } from '~~/interface'
import { mainStore } from '~~/store'
const store = mainStore()

interface Props {
  level: Level
}

const props = defineProps<Props>()

const clickTarget = ref([])

function disableButton(level: Level, coords: number[]) {
  store.disableButton(level, coords)
}

</script>

<style lang="scss" scoped>
.field {
  margin: 50px auto;
  display: grid;
  justify-content: center;
  width: fit-content;
}

.cell.disabled {
  cursor: auto;
}

.statistic__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.flag__icon,
.clock__icon {
  display: block;
  width: 24px;
  height: 24px;
}

.flag__icon {
  background: url('/icon/flag.svg') center center no-repeat;
  background-size: contain;
}

.clock__icon {
  background: url('/icon/clock.svg') center center no-repeat;
  background-size: contain;
}

.statistic__item {
  min-width: 90px;
}
</style>