import { createRouter, createWebHistory } from 'vue-router'

// Eager loading: componentes carregados imediatamente (rotas principais)
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

import { getProductById } from '@/data/shophub-data.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetailView,
      // beforeEnter: guard específico desta rota (executa antes de renderizar)
      // Valida se o produto existe - caso contrário redireciona para 404
      beforeEnter: (to, from, next) => {
        const product = getProductById(to.params.id)

        if (!product) {
          next({ name: 'product-not-found' })
        } else {
          next()
        }
      },
    },
    {
      path: '/cart',
      name: 'cart',
      // Lazy loading: componente só é carregado quando a rota é acedida
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      // Guard: impede acesso se carrinho estiver vazio
      beforeEnter: (to, from, next) => {
        const cart = JSON.parse(localStorage.getItem('shophub-cart') || '[]')

        if (cart.length === 0) {
          alert('O teu carrinho está vazio!')
          next({ name: 'products' })
        } else {
          next()
        }
      },
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/SuccessView.vue'),
      // Guard: só permite acesso se veio do checkout
      // Previne acesso direto via URL
      beforeEnter: (to, from, next) => {
        if (from.name === 'checkout') {
          next()
        } else {
          next({ name: 'home' })
        }
      },
    },
    {
      path: '/product-not-found',
      name: 'product-not-found',
      component: () => import('../views/ProductNotFoundView.vue'),
    },
  ],
  // scrollBehavior: controla posição de scroll ao navegar entre rotas
  scrollBehavior(to, from, savedPosition) {
    // savedPosition: posição guardada quando se utiliza o botão voltar do browser
    if (savedPosition) {
      return savedPosition
    }

    // Navegação nova: scroll para o topo
    return { top: 0 }
  },
})

export default router
