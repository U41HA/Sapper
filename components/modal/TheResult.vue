<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="isModalActive" class="modal__background" @click.self="newGame">
                <div v-if="isWin" class="modal__body modal__body-win">
                    <h3 class="font-24-800">Поздравляем!</h3>
                    <p class="font-14-600">Ваше время:</p>
                    <p class="font-18-800">{{ gameTime }}</p>
                    <v-btn class="pa-4 d-flex font-14-600" @click="newGame">Еще игра</v-btn>
                </div>
                <div v-else class="modal__body modal__body-lose">
                    <h3 class="font-24-800">Бум! Какая жалость!</h3>
                    <p class="font-14-600">Попробуйте еще раз</p>
                    <v-btn class="pa-4 d-flex font-14-600" @click="newGame">Еще игра</v-btn>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { mainStore } from '~~/store'
const store = mainStore()

const isModalActive = computed(() => store.isModalActive)
const isWin = computed(() => store.isWin)
const gameTime = computed(() => store.gameTime)

function newGame() {
    store.newGame()
}
</script>

<style lang="scss" scoped>
.modal__background {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: $color-black-300;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
}

.modal__body {
    position: relative;
    opacity: 1;
    background-color: $color-white-200;
    padding: 15px 30px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    z-index: 200;
}
</style>