import { defineStore } from 'pinia'
import { Level } from '~~/interface'
import { generateMatrix } from '~~/helpers/generateMatrix'
import { getRandomFromInterval } from '~~/helpers/getRandomFromInterval'
import { createBombCoord } from '~~/helpers/createBombCoord'
import { setBombs } from '~~/helpers/setBombs'
import { setBombValue } from '~~/helpers/setBombValue'

export const mainStore = defineStore('test-store', () => {
  // state

  const levelList = [
    {
      id: 1,
      name: 'Простой',
      line: 8,
      column: 8,
      bombCount: 7,
      firstClick: true,
      matrix: [[{}]]
    },
    {
      id: 2,
      name: 'Средний',
      line: 16,
      column: 16,
      bombCount: 30,
      firstClick: true,
      matrix: [[{}]]
    },
    {
      id: 3,
      name: 'Сложный',
      line: 32,
      column: 16,
      bombCount: 60,
      firstClick: true,
      matrix: [[{}]]
    }
  ]

  // action

  function setMatrix(level: Level, clickTarget: number[]): any[][] | void {
    if (level.firstClick) {
      const bombCoords = createBombCoord(level.column, level.line, level.bombCount, clickTarget)
      setBombs(bombCoords, level.matrix)
      setBombValue(level.matrix)
      level.firstClick = false
      return level.matrix
    } else return
  }

  function setEmptyMatrix (level: Level) {
   const matrix = Array(level.column).fill(0).map(() => Array(level.line).fill({}))
   generateMatrix(matrix)
   return matrix
  }

  levelList.forEach(item => item.matrix = setEmptyMatrix(item))

  function toggleButton(matrix: any[][], coords: number[]) {
    matrix[coords[0]][coords[1]].isVisible = false
  }

  function disableButton(matrix: any[][], coords: number[]) {
    console.log(matrix[coords[0]][coords[1]])
    matrix[coords[0]][coords[1]].isDisabled = !matrix[coords[0]][coords[1]].isDisabled
  }

  return {
    levelList,
    setMatrix,
    toggleButton,
    disableButton
  }
})
