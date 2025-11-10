import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import OverviewView from '../views/OverviewView.vue'
import UsersView from '../views/UsersView.vue'
import UserDetailView from '../views/UserDetailView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: DashboardView,
      // Nested routes - todas as páginas do dashboard
      children: [
        {
          path: '', // /dashboard
          component: OverviewView,
        },
        {
          path: 'users', // /dashboard/users
          component: UsersView,
        },
        {
          path: 'users/:id', // /dashboard/users/:id (rota dinâmica)
          component: UserDetailView,
        },
        {
          path: 'settings', // /dashboard/settings
          component: SettingsView,
        },
      ],
    },
  ],
})

export default router
