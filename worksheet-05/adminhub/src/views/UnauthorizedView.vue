<template>
  <div class="unauthorized-view">
    <div class="unauthorized-card">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="134"
          height="134"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-ban-icon lucide-ban"
        >
          <path d="M4.929 4.929 19.07 19.071" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      <h1>Acesso Negado</h1>

      <p class="message">Não tens permissões suficientes para aceder a esta página.</p>

      <div class="info-box">
        <p><strong>O teu role atual:</strong> {{ getRoleLabel(currentUser.role) }}</p>
        <p>Esta página requer um dos seguintes roles:</p>
        <ul>
          <li v-for="role in requiredRoles" :key="role">
            {{ getRoleLabel(role) }}
          </li>
        </ul>
      </div>

      <div class="actions">
        <button @click="goBack" class="secondary-button">Voltar</button>
        <router-link :to="{ name: 'dashboard' }" class="primary-button">
          Ir para Dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'

export default {
  name: 'UnauthorizedView',

  data() {
    return {
      currentUser: null,
      // Roles necessários para aceder à página anterior
      requiredRoles: [],
    }
  },

  methods: {
    getRoleLabel(role) {
      const labels = {
        admin: 'Administrador',
        manager: 'Gestor',
        viewer: 'Visualizador',
      }
      return labels[role] || role
    },

    goBack() {
      this.$router.go(-1)
    },
  },

  created() {
    this.currentUser = authStore.getUser()

    // Obtém requiredRoles passados via state pelo router guard
    const state = window.history.state

    if (state?.requiredRoles) {
      this.requiredRoles = state.requiredRoles
    } else {
      // Fallback: tenta obter da rota anterior
      const fromRoute = this.$router.options.history.state.back
      const routes = this.$router.getRoutes()
      const previousRoute = routes.find((r) => r.path === fromRoute)

      if (previousRoute?.meta?.allowedRoles) {
        this.requiredRoles = previousRoute.meta.allowedRoles
      } else {
        // Fallback final: assume admin se não encontrar
        this.requiredRoles = ['admin']
      }
    }
  },
}
</script>

<style scoped>
.unauthorized-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.unauthorized-card {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: var(--bg-soft);
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 5rem;
  color: var(--red);
}

h1 {
  font-size: 2.5rem;
  color: var(--red);
  margin-bottom: 1rem;
}

.message {
  font-size: 1.2rem;
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
}

.info-box {
  background: var(--black-mute);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: left;
}

.info-box p {
  margin-bottom: 1rem;
  color: var(--text-dark-secondary);
}

.info-box ul {
  list-style-position: inside;
  color: var(--text-dark-secondary);
}

.info-box li {
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-button,
.secondary-button {
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
}

.primary-button {
  background: var(--black-mute);
  color: var(--text-dark-blue);
}

.primary-button:hover {
  background: var(--btn-hover);
}

.secondary-button {
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: 2px solid var(--text-dark-blue);
}

.secondary-button:hover {
  background: var(--black-muted);
}
</style>
