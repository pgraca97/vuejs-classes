import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhotoView from '../views/PhotoView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/photo/:id',
      name: 'photo',
      component: PhotoView
    },
    {
      // Rota wildcard - captura TODAS as rotas que não deram match acima
      // CRITICAL: Esta rota DEVE estar sempre no final
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router