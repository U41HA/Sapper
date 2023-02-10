import { defineStore } from 'pinia'
import { Level } from '~~/interface'

export const mainStore = defineStore('test-store', () => {
  // state
  const list = ref(['123', '3333'])
  const matrix = ref()
  // action
  const levelList = [
    {
      id: 1,
      name: 'Простой',
      line: 8,
      column: 8,
      bombCount: 20
    },
    // {
    //   id: 2,
    //   name: 'Средний',
    //   line: 16,
    //   column: 16,
    //   bombCount: 85
    // },
    // {
    //   id: 3,
    //   name: 'Сложный',
    //   line: 32,
    //   column: 16,
    //   bombCount: 170
    // }
  ]

  function generateMatrix(level: Level) {
    matrix.value = new Array(level.column).fill(new Array(level.line).fill(2))
    console.log(matrix.value)
  }

  return {
    list,
    matrix,
    levelList,
    generateMatrix
  }
})
