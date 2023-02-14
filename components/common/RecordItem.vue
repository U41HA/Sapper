<template>
    <div class="record__wrapper">
        <p class="font-20-600 username">{{ props.data.userName }}</p>
        <p class="font-16-600 level">Сложность: {{ props.data.level }}</p>
        <p class="font-20-600 time">{{
            new Date(props.data.time).toLocaleTimeString([], {
                minute: '2-digit',
                second: '2-digit',
            })
        }}</p>
    </div>
</template>

<script setup lang="ts">
import { IRecord } from '~~/interface'
interface Props {
    data: IRecord
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.record__wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 30% 50% 20%;
    align-items: center;
    flex-wrap: wrap;
    box-shadow: 2px 2px 2px rgb(0 0 0 / 25%);
    background-color: $color-white-200;
    padding: 10px 20px;
    border-radius: 10px;
}

.username {
    justify-self: start;
    max-width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.time {
    justify-self: end;
}

.level {
    justify-self: center;
}
</style>