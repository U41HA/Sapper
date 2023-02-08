<template>
  <div class="font-16-500 test">
    <p>Store presentation:</p>
    {{ store.list }}
    <button
      class="font-13-800"
      @click="store.clearList()"
    >
      Clear store array
    </button>
    <button
      class="font-13-800"
      @click="store.pushInt('123')"
    >
      Push '123' to store
    </button>
  </div>
</template>

<script setup lang="ts">
// Store
import { testPiniaStore } from '~/store/index'
const store = testPiniaStore()
</script>

<style lang="scss" scoped>
.test {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: flex-start;
}

button {
    border: 2px solid $color-black-200;
    padding: 12px 24px;
    background-color: $color-white-100;
    border-radius: 4px;
    transition: background-color, color 0.3s;
    &:hover {
        color: $color-white-200;
        background-color: $color-black-100;
        transition: all 0.3s;
    }
}
</style>