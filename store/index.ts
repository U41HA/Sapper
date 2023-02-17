import { defineStore } from 'pinia'
import { IOptions, IRecord, Level } from '~~/interface'
import { generateMatrix } from '~~/helpers/generateMatrix'
import { setMatrix } from '~~/helpers/setMatrix'
import { setRecordList } from '~~/helpers/setRecordList'

export const mainStore = defineStore('test-store', () => {
  const config = useRuntimeConfig();
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
      emptyCell: 0,
      matrix: [[{}]],
      memory: {
        bombCount: 0,
        flagsCount: 0,
        emptyCell: 0
      }
    },
    {
      id: 2,
      name: 'Средний',
      line: 16,
      column: 16,
      bombCount: 30,
      firstClick: true,
      flagsCount: 0,
      emptyCell: 0,
      matrix: [[{}]],
      memory: {
        bombCount: 0,
        flagsCount: 0,
        emptyCell: 0
      }
    },
    {
      id: 3,
      name: 'Сложный',
      line: 32,
      column: 16,
      bombCount: 3,
      firstClick: true,
      flagsCount: 0,
      emptyCell: 0,
      matrix: [[{}]],
      memory: {
        bombCount: 0,
        flagsCount: 0,
        emptyCell: 0
      }
    },
    {
      id: 4,
      name: 'Custom',
      line: 0,
      column: 0,
      bombCount: 0,
      firstClick: true,
      flagsCount: 0,
      emptyCell: 0,
      matrix: [[{}]],
      memory: {
        bombCount: 0,
        flagsCount: 0,
        emptyCell: 0
      }
    },

  ]

  const isModalActive = ref(false)

  const isWin = ref(false)

  const startTime = ref()
  const endTime = ref()
  const gameTime = ref(0)
  const timerID = ref()

  const userName = ref('Безымянный')

  const recordList = ref<IRecord[]>([])

  const middleDownTimer = ref()

  // action

  function openCell(level: Level, clickTarget: number[]) {
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
    if (!level.matrix[i][j].isBomb && !level.matrix[i][j].bombAround && !level.matrix[i][j].isDisabled && !level.matrix[i][j].isDoubt) {
      for (let k = i - 1; k <= i + 1; k++) {
        for (let f = j - 1; f <= j + 1; f++) {
          if ((k >= 0 && f >= 0) && (k < level.matrix.length && f < level.matrix[0].length) && level.matrix[k][f].isVisible) {
            if (level.matrix[k][f].isVisible) {
              level.emptyCell--
            }
            level.matrix[k][f].isVisible = false
            if (!level.emptyCell) {
              toggleWin(level, true)
            }
            setTimeout(() => { openEmptyCells(level, k, f) }, 25)
          }
        }
      }
    } else if (!level.matrix[i][j].isDisabled && !level.matrix[i][j].isDoubt) {
      if (level.matrix[i][j].isVisible) {
        level.emptyCell--
      }
      level.matrix[i][j].isVisible = false
      if (level.matrix[i][j].isBomb) {
        toggleWin(level, false)
      }
      if (!level.emptyCell) {
        toggleWin(level, true)
      }
    } else return
  }

  function setEmptyMatrix(level: Level) {
    const matrix = Array(level.column).fill(0).map(() => Array(level.line).fill({}))
    generateMatrix(matrix)
    return matrix
  }

  levelList.forEach(item => {
    item.matrix = setEmptyMatrix(item)
    item.flagsCount = item.bombCount
    item.emptyCell = item.column * item.line - item.bombCount
    item.memory.bombCount = item.bombCount
    item.memory.emptyCell = item.emptyCell
    item.memory.flagsCount = item.flagsCount
  })

  function disableButton(level: Level, coords: number[]) {
    let [i, j] = coords

    const isBomb = level.matrix[i][j].isBomb
    const isDisabled = level.matrix[i][j].isDisabled
    const isVisible = level.matrix[i][j].isVisible
    const isDoubt = level.matrix[i][j].isDoubt

    function toggleCell() {
      if (isDisabled) {
        level.matrix[i][j].isDisabled = !isDisabled
        level.matrix[i][j].isDoubt = !isDoubt
      } else if (isDoubt) {
        level.matrix[i][j].isDoubt = !isDoubt
      } else {
        level.matrix[i][j].isDisabled = !isDisabled
      }
    }


    if (isBomb && !isDisabled && isVisible && level.flagsCount && !isDoubt) {
      toggleCell()
      level.bombCount--
      level.flagsCount--
    } else if (isBomb && isVisible && isDisabled) {
      toggleCell()
      level.bombCount++
      level.flagsCount++
    } else if (level.flagsCount && isVisible && !isDisabled && !isDoubt) {
      toggleCell()
      level.flagsCount--
    } else if (isDisabled) {
      toggleCell()
      level.flagsCount++
    } else if (isDoubt) {
      toggleCell()
    }
  }

  function newGame(level: Level) {
    if (process.client) {
      isModalActive.value = false
      resetLevel(level)
    }
  }

  async function toggleWin(level: Level, winValue: boolean) {
    if (isModalActive.value) {return}
    isWin.value = winValue
    isModalActive.value = true
    clearTimeout(timerID.value)
    if (winValue) {
      await setRecordList(recordList, { userName: userName.value, time: gameTime.value, level: level.name, column: level.column, line: level.line, bombCount: level.memory.bombCount }, config.public.mockUrl)
      // await updateRecordList()
      // console.log(recordList.value)
    }
  }

  function setTimer(level: Level) {
    if (!level.bombCount) {
      gameTime.value = Math.abs(startTime.value.getTime() - new Date().getTime())
    } else {
      gameTime.value = Math.abs(startTime.value.getTime() - new Date().getTime())
      timerID.value = setTimeout(() => { setTimer(level) }, 1000)
    }
  }

  async function updateRecordList() {
    const res =  await fetch(`${config.public.mockUrl}/records`)
    const fetchedRecordList = await res.json()
    recordList.value = fetchedRecordList
  }

  function updateUserName(name: string) {
    userName.value = name
  }

  function decreaseOpenedCell(level: Level) {
    level.emptyCell--
    if (!level.emptyCell) {
      toggleWin(level, true)
    }
  }

  function resetLevel(level: Level) {
    level.matrix = setEmptyMatrix(level)
    level.firstClick = true
    level.bombCount = level.memory.bombCount
    level.emptyCell = level.memory.emptyCell
    level.flagsCount = level.memory.flagsCount
    level.matrix.forEach(item => item.forEach(item => item.isVisible = true))
    level.matrix.forEach(item => item.forEach(item => item.isDisabled = false))
    level.matrix.forEach(item => item.forEach(item => item.isDoubt = false))
    clearTimeout(timerID.value)
    startTime.value = 0
    endTime.value = 0
    gameTime.value = 0
  }

  function cleanRecordList() {
    recordList.value = []
  }

  function startCustomGame(level: Level, options: IOptions) {
    resetLevel(level)
    level.bombCount = options.bombCount
    level.column = options.fieldColumn
    level.line = options.fieldLine
    level.matrix = setEmptyMatrix(level)
    level.flagsCount = level.bombCount
    level.emptyCell = level.column * level.line - level.bombCount
    level.memory.bombCount = level.bombCount
    level.memory.emptyCell = level.emptyCell
    level.memory.flagsCount = level.flagsCount
  }

  function openByMiddle(level: Level, coords: number[]) {
    if (Math.abs(middleDownTimer.value.getTime() - new Date().getTime()) > 1000) {
      console.log('Прошло времени в мс: ', Math.abs(middleDownTimer.value.getTime() - new Date().getTime()))
      return
    } else {
      console.log('Прошло меньше 1 секунды')
      let [i, j] = coords
      if (level.firstClick) {
        setMatrix(level, coords)
        startTime.value = new Date()
        setTimer(level)
      }
      if (!level.matrix[i][j].isVisible) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let f = j - 1; f <= j + 1; f++) {
            if ((k >= 0 && f >= 0) && (k < level.matrix.length && f < level.matrix[0].length) && level.matrix[k][f].isVisible && !level.matrix[k][f].isDisabled) {
              if (level.matrix[k][f].isVisible) {
                level.emptyCell--
              }
              level.matrix[k][f].isVisible = false
              if (!level.emptyCell) {
                toggleWin(level, true)
              }
              if (level.matrix[k][f].isBomb) {
                toggleWin(level, false)
              }
            }
          }
        }
      }
      
    } 
  }

  function regMiddleClick() {
    middleDownTimer.value = new Date()
    console.log('Отсчет времени клика пошел')
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
    newGame,
    updateUserName,
    updateRecordList,
    decreaseOpenedCell,
    cleanRecordList,
    startCustomGame,
    openByMiddle,
    regMiddleClick
  }
})
