<template>
    <div class="record__wrapper">
        <p class="font-20-600 username">{{ props.data.userName }}</p>
        <p v-if="props.data.level === 'Custom'" class="font-16-600 level">Уровень: {{ props.data.level }} {{ props.data.line }} x {{ props.data.column }} (Bomb: {{ props.data.bombCount }})</p>
        <p v-else class="font-16-600 level">Уровень: {{ props.data.level }}</p>
        <p class="font-20-600 time">{{convertStampToTime(props.data.time)}}</p>
    </div>
</template>

<script setup lang="ts">
import { IRecord } from '~~/interface'
import { convertStampToTime } from '~~/helpers/convertStampToTime';
interface Props {
    data: IRecord
}

const props = defineProps<Props>()

</script>

<style lang="scss" scoped>
.record__wrapper {
    width: 100%;
    min-width: max-content;
    display: grid;
    grid-template-columns: 35% 45% 20%;
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
    white-space: nowrap;
}

.time {
    justify-self: end;
}

.level {
    justify-self: start;
}
</style>