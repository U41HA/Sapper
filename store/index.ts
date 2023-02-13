import { defineStore } from 'pinia'
import { Level } from '~~/interface'
import { generateMatrix } from '~~/helpers/generateMatrix'
import { setMatrix } from '~~/helpers/setMatrix'
import { ClientOnly } from '~~/.nuxt/components'

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
      bombCount: 1,
      firstClick: true,
      matrix: [[{}]]
    }
  ]

  const isModalActive = ref(false)

  const isWin = ref(false)

  const startTime = ref()
  const endTime = ref()
  const gameTime = ref()

  // action

  function openCell(level: Level, clickTarget: number[]): any[][] | void {
    if (level.firstClick) {
      setMatrix(level, clickTarget)
      startTime.value = new Date()
      openEmptyCells(level, clickTarget[0], clickTarget[1])
    } else {
      openEmptyCells(level, clickTarget[0], clickTarget[1])
    }
  }

  function openEmptyCells(level: Level, i: number, j: number) {
    if (!level.matrix[i][j].isBomb && !level.matrix[i][j].bombAround && !level.matrix[i][j].isDisabled) {
      for (let k = i - 1; k <= i + 1; k++) {
        for (let f = j - 1; f <= j + 1; f++) {
          if ((k >= 0 && f >= 0) && (k < level.matrix.length && f < level.matrix[0].length) && level.matrix[k][f].isVisible) {
            level.matrix[k][f].isVisible = false
            setTimeout(() => { openEmptyCells(level, k, f) }, 30)
          }
        }
      }
    } else if (!level.matrix[i][j].isDisabled) {
      level.matrix[i][j].isVisible = false
      if (level.matrix[i][j].isBomb) {
        console.log('Boom!')
        toggleModal()
        console.log(isModalActive.value)
      }
    }
  }

  function setEmptyMatrix(level: Level) {
    const matrix = Array(level.column).fill(0).map(() => Array(level.line).fill({}))
    generateMatrix(matrix)
    return matrix
  }

  levelList.forEach(item => item.matrix = setEmptyMatrix(item))

  function disableButton(level: Level, coords: number[]) {
    let [i, j] = coords
    if (level.matrix[i][j].isBomb && !level.matrix[i][j].isDisabled && level.matrix[i][j].isVisible) {
      level.matrix[i][j].isDisabled = !level.matrix[i][j].isDisabled
      level.bombCount--
      if (!level.bombCount) {
        toggleWin()
        toggleModal()
      }
    } else if (level.matrix[i][j].isBomb && level.matrix[i][j].isVisible) {
      level.matrix[i][j].isDisabled = !level.matrix[i][j].isDisabled
      level.bombCount++
    } else {
      level.matrix[i][j].isDisabled = !level.matrix[i][j].isDisabled
    }
  }

  function toggleModal() {
    isModalActive.value = !isModalActive.value
  }

  function newGame() {
    toggleModal()
    toggleWin()
    if(process.client) {
      window.location.reload()
    }
  }

  function toggleWin() {
    isWin.value = !isWin.value
    endTime.value = new Date()
    gameTime.value = new Date(Math.abs(startTime.value.getTime() - endTime.value.getTime())).toLocaleTimeString([], {
      minute: '2-digit',
      second: '2-digit',
    })
    console.log(gameTime.value)
  }

  return {
    levelList,
    isModalActive,
    isWin,
    gameTime,
    openCell,
    disableButton,
    toggleModal,
    newGame
  }
})
