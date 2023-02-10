<template>
    <div class="field" :style="`grid-template-columns: repeat(${props.level.line}, 30px); grid-template-rows: repeat(${props.level.column}, 30px);`" @click="store.setMatrix(level, clickTarget)">
      <template v-for="column, index in props.level.matrix">
        <common-the-cell v-for="cell, index2 in column" :row-index="index" :column-index="index2" :key="index2" :data="cell" v-model:clickTarget="clickTarget"></common-the-cell>
      </template>
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

const clickTarget = ref()



// const matrix = ref(Array(props.level.column).fill(0).map(() => Array(props.level.line).fill({})))

// function generateMatrix(matrix: any[][]) {
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[i].length; j++) {
//             matrix[i][j] = {...{isBomb: false, bombAround: 0}}
//         }
//     }
// }

// generateMatrix(matrix.value)

// function getRandomFromInterval(min:number, max:number) {
//     return Math.floor(Math.random() * (max - min + 1) + min)
// }

// function bombCoord () {
//     const randomNumber: number[] = []
//     const cellCount = props.level.column * props.level.line
//     for (let i = 0; i < props.level.bombCount; i++) {
//         let randomNum = getRandomFromInterval(0, cellCount - 1)
//         while (randomNumber.includes(randomNum)) {
//             randomNum = getRandomFromInterval(0, cellCount - 1)
//         }
//         randomNumber.push(randomNum) 
//     }
//     const randomCoords =  randomNumber.map(item => new Array(Math.floor(item / props.level.line), (item % props.level.line)))
//     return randomCoords
// }

// function setBombs(arr: number[][]) {
//     for (let i = 0; i < arr.length; i++) {
//         // console.log(matrix.value[arr[i][0]][arr[i][1]].isBomb)
//         matrix.value[arr[i][0]][arr[i][1]] = {...{isBomb: true, bombAround: 0}}
//     }
// }

// function setBombValue(arr: any[][]) {
//     for (let i = 0; i < arr.length; i++) {
//         for(let j = 0; j < arr[i].length; j++) {
//             for (let k = i - 1; k <= i + 1; k++) {
//                 for (let f = j - 1; f <= j + 1; f++) {
//                     if (k >= 0 && f >= 0 && k < arr.length && f < arr[0].length && arr[k][f].isBomb) {
//                         arr[i][j].bombAround++
//                     }
//                 }
//             }
//         }
//     }
// }
// const bombCoords = bombCoord()
// setBombs(bombCoords)
// setBombValue(matrix.value)

</script>

<style lang="scss" scoped>

</style>