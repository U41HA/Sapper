import { defineStore } from 'pinia'

export const testPiniaStore = defineStore('test-store', () => {
  // state
  const list = ref(['123', '3333'])
  // action
  function clearList() {
    list.value.pop()
  }
  function pushInt(value: string) {
    list.value.push(value)
  }

  return {
    list,
    clearList,
    pushInt
  }
})
