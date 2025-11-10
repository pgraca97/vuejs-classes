import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '@/stores/auth.js'

// Eager loading: componente carregado imediatamente (rota principal)
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login - AdminHub',
        requiresAuth: false,
        requiresGuest: true, // Previne acesso se já autenticado
      },
    },
    {
      path: '/',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // Lazy loading: carrega apenas quando necessário
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - AdminHub',
        requiresAuth: true,
        breadcrumb: 'Dashboard',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        title: 'Perfil - AdminHub',
        requiresAuth: true,
        breadcrumb: 'Perfil',
      },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: {
        title: 'Gestão de Utilizadores - AdminHub',
        requiresAuth: true,
        allowedRoles: ['admin', 'manager'], // Apenas admin e manager podem aceder
        breadcrumb: 'Utilizadores',
      },
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/AnalyticsView.vue'),
      meta: {
        title: 'Analytics - AdminHub',
        requiresAuth: true,
        allowedRoles: ['admin'], // Apenas admin pode aceder
        breadcrumb: 'Analytics',
      },
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue'),
      meta: {
        title: 'Acesso Negado - AdminHub',
        requiresAuth: true,
        breadcrumb: 'Acesso Negado',
      },
    },
  ],
})

// Global beforeEach guard: executa ANTES de cada navegação
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest
  const isAuthenticated = authStore.isAuthenticated()

  // 1. Previne utilizadores autenticados de aceder a rotas de guest (ex: login)
  if (requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  // 2. Redireciona utilizadores não autenticados para login
  if (requiresAuth && !isAuthenticated) {
    // Guarda rota de destino para redirecionar após login
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
    return
  }

  // 3. Verifica permissões baseadas em roles
  if (requiresAuth && isAuthenticated) {
    const allowedRoles = to.meta.allowedRoles

    if (allowedRoles && !authStore.canAccess(allowedRoles)) {
      // Utilizador não tem permissão, passa roles via state
      next({
        name: 'unauthorized',
        state: { requiredRoles: allowedRoles },
      })
      return
    }
  }

  // 4. Navegação permitida
  next()
})

// Global afterEach hook: executa APÓS cada navegação
router.afterEach((to, from) => {
  // Atualiza título da página
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Regista navegação no audit trail
  if (authStore.isAuthenticated() && from.name) {
    authStore.addNavigation(from, to)
  }
})

export default router
