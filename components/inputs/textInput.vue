<template>
    <div class="input">
        <div v-if="type === 'text'">
            <input id="#" v-model="data" :type="type" name="#" pattern="^[a-zA-Z]+$|^[А-Яа-яЁё\s]+$"
                :placeholder="placeholder" class="font-16-500" :disabled="disabled">
            <p class="font-9-500 error">
                Ошибка. Допустимы только буквы
            </p>
        </div>
        <div v-else>
            <input id="#" v-model="data" :type="type" name="#" :placeholder="placeholder" class="font-16-500"
                :disabled="disabled" :required="required" :max="max">
            <p v-if="max !== 'NaN'" class="font-9-500 error">
                Ошибка. Максимальное значение: {{ max }}
            </p>
            <p v-else class="font-9-500 error">
                Ошибка. Максимальное значение: 0
            </p>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
interface Props {
    modelValue: string | number | null | undefined,
    placeholder: string,
    disabled: boolean,
    type: string,
    required?: boolean,
    max?: string
}


const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>

<style lang="scss" scoped>
input {
    box-sizing: border-box;
    width: 100%;
    outline: none;
    border: none;
    padding: 0;
    padding-bottom: 2px;
    border-bottom: 2px solid $color-gray-100;
    background-color: transparent;

    &::placeholder {
        color: $color-gray-100;
    }

    &:focus {
        border-color: $color-black-200;
    }

    &:invalid {
        border-color: $color-red-200;

        &~.error {
            scale: 1;
            transition: scale 0.3s;
        }
    }
}

input[type='text'].font-16-800 {
    @media (max-width: $md) {
        font-size: 1.4rem;
    }
}

.error {
    margin-top: 2px;
    color: $color-red-200;
    scale: 0;
    transition: scale 0.3s;
}
</style>
