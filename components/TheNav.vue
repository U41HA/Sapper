<template>
    <nav class="navigation d-flex flex-column align-center">
        <h2 class="font-20-800 navigation__title mb-3">Выберите сложность</h2>
        <ul class="navigation__list d-flex justify-center">
            <li class="navigation__item" v-for="level in data" :key="level.id" @click="changeLevel(level)">
                <v-btn class="font-14-600 pa-4 d-flex button" :active="level.id === currentLevel.id">{{
                    level.name
                }}</v-btn>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { Level } from '~~/interface';
interface Props {
    data: Level[],
    currentLevel: Level
}

const props = defineProps<Props>()

const emit = defineEmits(['update:currentLevel'])

function changeLevel(level: Level) {
    emit('update:currentLevel', level)
}

</script>

<style lang="scss" scoped>
.navigation__list {
    gap: 20px;
    align-items: center;

    @media (max-width: 480px) {
        flex-direction: column;
        min-width: 100%;
        // align-items: center;
    }
}

.navigation__item,
.button {
    @media (max-width: 480px) {
        min-width: 100%;
    }
}
</style>