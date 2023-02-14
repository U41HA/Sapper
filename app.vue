<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
html {
  font-family: "Gilroy";
  font-size: 10px;
  font-weight: 500;
  color: $color-black-200;
}

*,
*:before,
*:after {
  margin: 0;
}

body:has(> .modal__background) {
  height: 100vh;
  overflow: hidden;
}

</style>