<template>
  <div>
    <div class="main-wrapper">
      <div class="title">
        <p class="font-24-800 text">
          Привет! Это тестовая настройка Nuxt 3
        </p>
        <p class="font-18-600 subtitle">
          Stack: Nuxt 3, Typescript, Eslint, Composition Api, Pinia, Vuetify
        </p>
      </div>
    
      <the-test />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.main-wrapper {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
}
.text,
.subtitle {
  text-align: center;
}

.subtitle {
  margin-top: 10px;
}
</style>