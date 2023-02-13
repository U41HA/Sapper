<template>
    <div class="field" :style="`grid-template-columns: repeat(${props.level.line}, 30px); grid-template-rows: repeat(${props.level.column}, 30px);`" @click="store.setMatrix(level, clickTarget)">
      <template v-for="column, indexX in props.level.matrix">
        <common-the-cell v-for="cell, indexY in column" :row-index="indexX" :column-index="indexY" :key="indexY" :data="cell" v-model:clickTarget="clickTarget" @click="toggleButton(props.level.matrix, clickTarget)"
        @click.right.prevent="disableButton(props.level.matrix, clickTarget)"
            ></common-the-cell>
      </template>
      {{ clickTarget }}
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

function toggleButton(matrix: any[][], coords: number[]) {
    store.toggleButton(matrix, coords)
}

function disableButton(matrix: any[][], coords: number[]) {
    store.disableButton(matrix, coords)
}

</script>

<style lang="scss" scoped>
.field {
}
</style>