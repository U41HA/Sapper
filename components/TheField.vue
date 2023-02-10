<template>
    <div class="field" :style="`grid-template-columns: repeat(${props.level.line}, 30px); grid-template-rows: repeat(${props.level.column}, 30px);`">
      <template v-for="column, index in matrix">
        <common-the-cell v-for="line, index2 in column" :row-index="index" :column-index="index2" :key="index2">{{ line }}</common-the-cell>
      </template>
    </div>
</template>

<script setup lang="ts">
import { Level } from '~~/interface';

interface Props {
    level: Level
}

const props = defineProps<Props>()

// const matrix = [[2,2,2], [2,2,2], [2,2,2]]
// const lines = new Array(props.level.line).fill(0)
// const matrix = new Array(props.level.column).fill(lines)
const matrix = ref(Array(props.level.column).fill(0).map(() => Array(props.level.line).fill(1)))

function getRandomFromInterval(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function bombCoord () {
    const randomNumber: number[] = []
    const cellCount = props.level.column * props.level.line
    for (let i = 0; i < props.level.bombCount; i++) {
        let randomNum = getRandomFromInterval(1, cellCount)
        while (randomNumber.includes(randomNum)) {
            randomNum = getRandomFromInterval(1, cellCount)
        }
        randomNumber.push(randomNum) 
    }
    const randomCoords =  randomNumber.map(item => new Array(Math.floor(item / props.level.line), (item % props.level.line === 0 ? item / props.level.line : item % props.level.line - 1)))
    return randomCoords
}

function setBombs(arr: number[][]) {
    // console.log(matrix.value[7][7]);
    
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
        // matrix.value[arr[i][0]][arr[i][1]] = 0
    }
    // console.log(matrix.value)
}

// function setBombValue(arr: number[][]) {
//     for (let i = 0; i < arr.length; i++) {
//         for(let j = 0; j < arr[i].length; j++) {
//             arr[i][j] = 
//         }
//     }
// }
const bombCoords = bombCoord()
setBombs(bombCoords)
// console.log(matrix[0][0])
// console.log(bombCoords)
// console.log(bombCoord())


</script>

<style lang="scss" scoped>

</style>