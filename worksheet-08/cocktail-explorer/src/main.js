import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles.css'

// Cria a instância da aplicação Vue
const app = createApp(App)

// Configura Pinia (gestão de estado)
const pinia = createPinia()
app.use(pinia)

// Configura Vue Router
app.use(router)

// Monta a aplicação no elemento #app
app.mount('#app')
