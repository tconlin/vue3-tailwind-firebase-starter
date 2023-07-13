import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/index'
import { registerSW } from 'virtual:pwa-register'

import './App.css'

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)

import './firebase/init'

app.use(router).mount('#app')
