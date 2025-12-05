import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cocktail/:id',
    name: 'cocktail-detail',
    // Lazy loading: componente só é carregado quando a rota é acedida
    component: () => import('@/views/CocktailDetailView.vue'),
  },
  {
    path: '/random',
    name: 'random',
    component: () => import('@/views/RandomCocktailView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
