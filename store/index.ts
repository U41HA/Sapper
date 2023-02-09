import { defineStore } from 'pinia'

export const mainStore = defineStore('test-store', () => {
  // state
  const list = ref(['123', '3333'])
  const levelList = ref([
    {
      id: 1,
      name: 'Простой',
      line: 8,
      column: 8,
      bombCount: 20
    },
    {
      id: 2,
      name: 'Средний',
      line: 16,
      column: 16,
      bombCount: 85
    },
    {
      id: 3,
      name: 'Сложный',
      line: 32,
      column: 16,
      bombCount: 170
    }
  ])
  // action
  function clearList() {
    list.value.pop()
  }
  function pushInt(value: string) {
    list.value.push(value)
  }

  return {
    list,
    levelList,
    clearList,
    pushInt
  }
})
