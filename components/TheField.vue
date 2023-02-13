<template>
  <div>
    <div class="field"
      :style="`grid-template-columns: repeat(${props.level.line}, 30px); grid-template-rows: repeat(${props.level.column}, 30px);`"
      @click="store.openCell(level, clickTarget)" @click.right.prevent="disableButton(props.level, clickTarget)">
      <template v-for="column, indexX in props.level.matrix">
        <common-the-cell v-for="cell, indexY in column" :row-index="indexX" :column-index="indexY" :key="indexY"
          :data="cell" v-model:clickTarget="clickTarget" class="cell" :class="{ 'disabled': cell.isDisabled }">
        </common-the-cell>
      </template>
    </div>
    <div class="mt-10 font-12-600">
      Количество бомб: {{ props.level.bombCount }}
    </div>
  </div>

</template>

<script setup lang="ts">
import { Level } from '~~/interface';
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
  margin: 50px 0px;
  display: grid;
  justify-content: center;
}

.cell.disabled {
  pointer-events: none;
}
</style>