import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import AllProductsView from '../views/AllProductsView.vue'
import CategoryView from '../views/CategoryView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/shop',
      component: ShopView,
      // Nested routes (rotas filhas)
      children: [
        {
          // Path vazio significa "mesma rota que o pai"
          // Quando acedemos a /shop, renderiza AllProductsView
          path: '',
          component: AllProductsView,
        },
        {
          // Path relativo ao pai
          // /shop/category/:name
          path: 'category/:name',
          component: CategoryView,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
