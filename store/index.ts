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
  //   function generateMatrix (levelList: Level[]) {
  //     levelList.forEach(element => element.matrix());
  //   }

  function setMatrix(level: Level, clickTarget: number[]): any[][] | void {
    console.log((clickTarget))
    if (level.firstClick) {
      const bombCoords = createBombCoord(level.column, level.line, level.bombCount)
      setBombs(bombCoords, level.matrix)
      setBombValue(level.matrix)
      level.firstClick = false
      console.log(level.firstClick)
      return level.matrix
    } else return
  }

  function setEmptyMatrix (level: Level) {
   const matrix = Array(level.column).fill(0).map(() => Array(level.line).fill({}))
   generateMatrix(matrix)
   return matrix
  }

  levelList.forEach(item => item.matrix = setEmptyMatrix(item))
  // levelList.forEach(item => item.matrix = setMatrix(item))

  return {
    levelList,
    setMatrix,
    // generateMatrix
  }
})
