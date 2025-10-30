import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleListView from '../views/ArticleListView.vue'
import ArticleView from '../views/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/articles',
      component: ArticleListView
    },
    {
      path: '/articles/:id', // Rota dinâmica - :id captura qualquer valor
      component: ArticleView
    }
  ]
})

export default router