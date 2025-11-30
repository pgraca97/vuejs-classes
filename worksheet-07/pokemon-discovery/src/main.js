import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './styles.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Configuração do Pinia com plugin de persistência
// Permite guardar estado da store em localStorage
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
