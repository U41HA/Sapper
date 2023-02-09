<template>
  <header class="header font-32-800">IQ-SAPPER</header>
  <main class="main">
    <slot />
  </main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.header {
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @extend %shadow;
}
</style>