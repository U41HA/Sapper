import { defineStore } from 'pinia'
import { IRecord, Level } from '~~/interface'
import { generateMatrix } from '~~/helpers/generateMatrix'
import { setMatrix } from '~~/helpers/setMatrix'
import { ClientOnly } from '~~/.nuxt/components'
import { setRecordList } from '~~/helpers/setRecordList'

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
      flagsCount: 0,
      matrix: [[{}]]
    },
    {
      id: 2,
      name: 'Средний',
      line: 16,
      column: 16,
      bombCount: 30,
      firstClick: true,
      flagsCount: 0,
      matrix: [[{}]]
    },
    {
      id: 3,
      name: 'Сложный',
      line: 32,
      column: 16,
      bombCount: 1,
      firstClick: true,
      flagsCount: 0,
      matrix: [[{}]]
    }
  ]

  const isModalActive = ref(false)

  const isWin = ref(false)

  const startTime = ref()
  const endTime = ref()
  const gameTime = ref(0)
  const timerID = ref()

  const userName = ref('Безымянный')

  let recordList = ref<IRecord[]>()

  // action

  function openCell(level: Level, clickTarget: number[]): any[][] | void {
    if (level.firstClick) {
      setMatrix(level, clickTarget)
      startTime.value = new Date()
      setTimer(level)
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

  levelList.forEach(item => {
    item.matrix = setEmptyMatrix(item)
    item.flagsCount = item.bombCount
  })

  function disableButton(level: Level, coords: number[]) {
    let [i, j] = coords
    function toggleCell() {
      level.matrix[i][j].isDisabled = !level.matrix[i][j].isDisabled
    }
    const isBomb = level.matrix[i][j].isBomb
    const isDisabled = level.matrix[i][j].isDisabled
    const isVisible = level.matrix[i][j].isVisible

    if (isBomb && !isDisabled && isVisible && level.flagsCount) {
      toggleCell()
      level.bombCount--
      level.flagsCount--
      if (!level.bombCount) {
        toggleWin(level)
        toggleModal()
      }
    } else if (isBomb && isVisible && isDisabled) {
      toggleCell()
      level.bombCount++
      level.flagsCount++
    } else if (level.flagsCount && isVisible && !isDisabled){
      toggleCell()
      level.flagsCount--
    } else if(isDisabled) {
      toggleCell()
      level.flagsCount++
    }
    // if (!isDisabled && isVisible && level.flagsCount) {
    //   level.flagsCount--
    // } else if (isVisible && isDisabled){
    //   level.flagsCount++
    // }
  }

  function toggleModal() {
    isModalActive.value = !isModalActive.value
  }

  function newGame(level: Level) {
    if (!level.bombCount) {
      toggleModal()
    }
    if(process.client) {
      window.location.reload()
    }
  }

  function toggleWin(level: Level) {
    isWin.value = !isWin.value
    clearTimeout(timerID.value)
    setRecordList(recordList.value, {userName: userName.value, time: gameTime.value, level: level.name})
  }

  function setTimer(level: Level) {
    if (!level.bombCount) {
      gameTime.value = Math.abs(startTime.value.getTime() - new Date().getTime())
    } else {
      gameTime.value = Math.abs(startTime.value.getTime() - new Date().getTime())
      console.log(gameTime.value)
      timerID.value = setTimeout(() => {setTimer(level)}, 1000)
    }
  }

  function updateRecordList() {
    if(localStorage.recordList) {
      // console.log(localStorage.recordList)
      recordList.value = JSON.parse(localStorage.recordList)
      // console.log(recordList)
    }
  }

  function updateUserName(name: string) {
    userName.value = name
  }

  return {
    levelList,
    isModalActive,
    isWin,
    gameTime,
    userName,
    recordList,
    openCell,
    disableButton,
    toggleModal,
    newGame,
    updateUserName,
    updateRecordList
  }
})
