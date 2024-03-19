import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
const piniaSettings = piniaPluginPersistedstate
pinia.use(piniaSettings)
app.use(pinia)
app.use(router)

app.mount('#app')
