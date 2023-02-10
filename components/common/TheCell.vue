<template>
    <div class="wrapper font-9-500" @mouseover="changeCoords(props.rowIndex, props.columnIndex)">
        <span v-if="props.data?.isBomb">
            {{ props.data?.isBomb }}
        </span>
        <span v-else-if="props.data?.bombAround !== 0">
            {{ props.data?.bombAround }}
        </span>
        <v-btn v-if="isVisible" :class="{ 'disabled': isDisabled }" class="test__button" @click="toggleButton"
            @click.right.prevent="disableButton"></v-btn>
    </div>
</template>

<script setup lang="ts">
import { ICell } from '~~/interface';
interface Props {
    rowIndex: number,
    columnIndex: number,
    data: ICell | undefined,
    clickTarget: number[]
}
const props = defineProps<Props>()

const emit = defineEmits(['update:clickTarget'])

function changeCoords(x: number, y: number) {
    emit('update:clickTarget', [x, y])
}


const isVisible = ref(true)
const isDisabled = ref(false)
function toggleButton() {
    if (!isDisabled.value) {
        isVisible.value = !isVisible.value
    }
}
function disableButton() {
    isDisabled.value = !isDisabled.value
}

function logIt() {
    console.log(props.rowIndex, props.columnIndex)
}

</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    user-select: none;
}

span {
    position: relative;
    z-index: 1;
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
    background-color: $color-white-200;
    z-index: 10;

    &.disabled {
        // pointer-events: none;
        background: url('/icon/flag.svg') center center no-repeat, $color-gray-100;
        background-size: 50%;
    }
}
</style>