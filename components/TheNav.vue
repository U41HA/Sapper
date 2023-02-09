<template>
    <nav class="navigation">
        <ul class="navigation__list font-24-600 d-flex align-center justify-center">
            <li class="navigation__item" v-for="level in data" :key="level.id" @click="changeLevel(level)">
                <v-btn class="pa-4 d-flex" :active="level.id === currentLevel.id">{{ level.name }}</v-btn>
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
}

.navigation__item.active {
}
</style>