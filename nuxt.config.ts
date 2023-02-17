// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Hello, is an Nuxt 3 template'
    }
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/css/style.scss";'
        }
      }
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  runtimeConfig: {
    public: {
      mockUrl: ''
    },
    
  }
})
