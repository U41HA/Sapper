<template>
    <div 
        class="wrapper font-12-800" 
        @click="changeCoords(props.rowIndex, props.columnIndex)"
        @click.right.prevent="changeCoords(props.rowIndex, props.columnIndex)"
        @mousedown.middle="changeCoords(props.rowIndex, props.columnIndex)"
        :class="[{bomb: props.data?.isBomb}, `bomb-${props.data?.bombAround}`]">
        <span v-if="props.data?.bombAround !== 0">
            {{ props.data?.bombAround }}
        </span>
        <transition name="fade">
            <v-btn v-if="props.data?.isVisible || props.data?.isDoubt" :class="{ 'disabled': props.data?.isDisabled, 'doubt':props.data?.isDoubt }"
                class="test__button"></v-btn>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ICell, Level } from '~~/interface'
import { mainStore } from '~~/store'



interface Props {
    rowIndex: number,
    columnIndex: number,
    data: ICell | undefined,
    clickTarget: number[] | undefined | null,
    level: Level
}
const props = defineProps<Props>()
const store = mainStore()
const emit = defineEmits(['update:clickTarget'])

function changeCoords(x: number, y: number) {
    emit('update:clickTarget', [x, y])
}

// watch(props.level.matrix[props.rowIndex][props.columnIndex].isVisible, ()=> {
//     store.decreaseOpenedCell(props.level)
// })

</script>

<style lang="scss" scoped>
.wrapper {
    box-shadow: inset 0px 0px 2px $color-gray-100;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    user-select: none;
    box-shadow: inset;

    &.bomb {
        background: url('/icon/bomb.svg') center center no-repeat;
        background-size: 50%;
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
        cursor: auto;
        background: url('/icon/flag.svg') center center no-repeat, $color-gray-100;
        background-size: 50%;
    }

    &.doubt {
        background: url('/icon/doubt.svg') center center no-repeat, $color-gray-100;
        background-size: 40%;
    }
}
</style>