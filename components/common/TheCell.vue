<template>
    <div class="wrapper">
        <v-btn class="test__button"></v-btn>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.wrapper {
    width: 10px;
    height: 10px;
    position: relative;
}

.test__button {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 0px;
    border-radius: 0px;
}
</style>