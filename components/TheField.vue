<template>
  <div>
    <div class="field"
      :style="`grid-template-columns: repeat(${props.level.line}, 30px); grid-template-rows: repeat(${props.level.column}, 30px);`"
      @click="store.openCell(props.level, clickTarget)" 
      @click.right.prevent="disableButton(props.level, clickTarget)"
      @keyup.2="store.openByMiddle(props.level, clickTarget)"
      >
      <template v-for="column, indexX in props.level.matrix">
        <common-the-cell v-for="cell, indexY in column" :row-index="indexX" :column-index="indexY" :key="indexY"
          :data="cell" v-model:clickTarget="clickTarget" :level="props.level" class="cell" :class="{ 'disabled': cell.isDisabled }">
        </common-the-cell>
      </template>
    </div>
    <!-- TODO Разобраться с middle кнопкой мыши и ее ивентом. Функция работает, нужно дописать функцию просчета времени (как на выигрыше. Дата нажатия - дата отпуска кнопки. Если больше 1000 - делать функцию)  -->
    <form @submit.prevent="startCustomGame(props.level, {fieldColumn: fieldColumn, fieldLine: fieldLine, bombCount: bombCount})" class="custom__inputs" v-if="props.level.name === 'Custom'">
      <inputs-text-input :type="'number'" v-model="fieldColumn" :placeholder="'Число столбцов'" :disabled="!props.level.firstClick" :max="'32'"
      class="input text-input" :required="true"/>
      <inputs-text-input :type="'number'" v-model="fieldLine" :placeholder="'Число колонок'" :disabled="!props.level.firstClick" :max="'32'"
      class="input text-input" :required="true"/>
      <inputs-text-input :type="'number'" v-model="bombCount" :placeholder="'Число бомб'" :disabled="!props.level.firstClick" :max="`${maxBombCount}`"
      class="input text-input" :required="true"/>
      <v-btn type="submit" class="mt-5 pa-4 d-flex font-14-600">Начать игру</v-btn>
    </form>
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
import { Level, IOptions } from '~~/interface'
import { mainStore } from '~~/store'
const store = mainStore()

interface Props {
  level: Level
}

const props = defineProps<Props>()

const clickTarget = ref([])

const fieldColumn = ref()
const fieldLine = ref()
const bombCount = ref()
const maxBombCount = computed(() => Math.ceil(fieldColumn.value * fieldLine.value * 0.4)) 

function disableButton(level: Level, coords: number[]) {
  store.disableButton(level, coords)
}

function startCustomGame(level:Level, options: IOptions) {
    store.startCustomGame(level, options)
}



</script>

<style lang="scss" scoped>
.field {
  margin: 40px auto;
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