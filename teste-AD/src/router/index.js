// Configuração de rotas da aplicação

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/dish/new',
    name: 'dish-create',
    // Lazy loading: só carrega quando acedido
    component: () => import('@/views/DishFormView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
