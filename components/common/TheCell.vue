<template>
    <div class="wrapper font-12-800" @click="changeCoords(props.rowIndex, props.columnIndex)"  @click.right.prevent="changeCoords(props.rowIndex, props.columnIndex)" :class="[{bomb: props.data?.isBomb}, `bomb-${props.data?.bombAround}`]">
        <span v-if="props.data?.isBomb">
        </span>
        <span v-else-if="props.data?.bombAround !== 0">
            {{ props.data?.bombAround }}
        </span>
        <v-btn v-if="props.data?.isVisible" :class="{ 'disabled': props.data?.isDisabled }" class="test__button"></v-btn>
    </div>
</template>

<script setup lang="ts">
import { ICell } from '~~/interface';
interface Props {
    rowIndex: number,
    columnIndex: number,
    data: ICell | undefined,
    clickTarget: number[] | undefined | null
}
const props = defineProps<Props>()

const emit = defineEmits(['update:clickTarget'])

function changeCoords(x: number, y: number) {
    emit('update:clickTarget', [x, y])
}

// function disableButton() {
//     isDisabled.value = !isDisabled.value
// }

function logIt() {
    console.log(props.rowIndex, props.columnIndex)
}

</script>

<style lang="scss" scoped>
.wrapper {
    border: 1px solid $color-gray-100;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    user-select: none;
    box-shadow: inset ;

    &.bomb {
        background: url('/icon/bomb.svg') center center no-repeat;
        background-size: 40%;
    }

    &.bomb-1 {
        color: $color-blue-100;
    }
    &.bomb-2 {
        color: $color-green-300;
    }
    &.bomb-3 {
        color: $color-red-200;
    }
    &.bomb-4 {
        color: $color-blue-200;
    }
    &.bomb-5 {
        color: $color-brown-200;
    }
    &.bomb-6 {
        color: $color-aquamarine-100;
    }
    &.bomb-7 {
        color: $color-black-200;
    }
    &.bomb-8 {
        color: $color-white-200;
        text-shadow: 1px 1px 4px $color-black-200;
    }
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