<template>
  <div class="dashboard-view">
    <!-- Header com saudação personalizada -->
    <header class="dashboard-header">
      <div>
        <h1>Bem-vindo, {{ user.name }}</h1>
        <p class="role-badge" :class="`role-${user.role}`">
          {{ getRoleLabel(user.role) }}
        </p>
      </div>
      <div class="user-info">
        <img :src="user.avatar" :alt="user.name" class="avatar" />
        <div>
          <p class="user-name">{{ user.name }}</p>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>
    </header>

    <!-- Navegação rápida baseada em permissões -->
    <section class="quick-nav">
      <h2>Acesso Rápido</h2>
      <div class="nav-grid">
        <router-link :to="{ name: 'profile' }" class="nav-card">
          <div class="nav-icon">
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
              class="lucide lucide-user-round-icon lucide-user-round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
          </div>
          <h3>Perfil</h3>
          <p>Ver e editar perfil</p>
        </router-link>

        <!-- Só mostra se tiver permissão -->
        <router-link v-if="canAccessUsers" :to="{ name: 'users' }" class="nav-card">
          <div class="nav-icon">
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
              class="lucide lucide-ampersands-icon lucide-ampersands"
            >
              <path
                d="M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"
              />
              <path
                d="M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"
              />
            </svg>
          </div>
          <h3>Utilizadores</h3>
          <p>Gerir utilizadores</p>
        </router-link>

        <router-link v-if="canAccessAnalytics" :to="{ name: 'analytics' }" class="nav-card">
          <div class="nav-icon">
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
              class="lucide lucide-file-chart-column-icon lucide-file-chart-column"
            >
              <path
                d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
              />
              <path d="M14 2v5a1 1 0 0 0 1 1h5" />
              <path d="M8 18v-1" />
              <path d="M12 18v-6" />
              <path d="M16 18v-3" />
            </svg>
          </div>
          <h3>Analytics</h3>
          <p>Ver estatísticas</p>
        </router-link>
      </div>
    </section>

    <!-- Widgets de estatísticas (visíveis para todos) -->
    <section class="stats">
      <h2>Estatísticas Gerais</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ overview.totalUsers }}</div>
          <div class="stat-label">Total de Utilizadores</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ overview.activeUsers }}</div>
          <div class="stat-label">Utilizadores Ativos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ overview.newUsersThisMonth }}</div>
          <div class="stat-label">Novos Este Mês</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">€{{ formatNumber(overview.revenue) }}</div>
          <div class="stat-label">Receita</div>
        </div>
      </div>
    </section>

    <!-- Atividade recente -->
    <section class="recent-activity">
      <h2>Atividade Recente</h2>
      <div class="activity-list">
        <div v-for="log in recentLogs" :key="log.id" class="activity-item">
          <div class="activity-icon" :class="`type-${log.type}`"></div>
          <div class="activity-content">
            <p class="activity-action">
              <strong>{{ log.user }}</strong> {{ log.action }}
            </p>
            <p class="activity-target">{{ log.target }}</p>
            <p class="activity-time">{{ formatTimestamp(log.timestamp) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'
import { analyticsData, activityLogs } from '@/data/adminhub-data.js'

export default {
  name: 'DashboardView',

  data() {
    return {
      user: null,
      overview: analyticsData.overview,
      recentLogs: activityLogs.slice(0, 5),
    }
  },

  computed: {
    // Verifica permissões para mostrar navegação condicional
    canAccessUsers() {
      return authStore.canAccess(['admin', 'manager'])
    },

    canAccessAnalytics() {
      return authStore.canAccess(['admin'])
    },
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

    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'Agora mesmo'
      if (diffMins < 60) return `Há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
      if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`
      if (diffDays < 7) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`

      return date.toLocaleDateString('pt-PT')
    },

    formatNumber(num) {
      return num.toLocaleString('pt-PT')
    },
  },

  created() {
    this.user = authStore.getUser()
  },
}
</script>

<style scoped>
.dashboard-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--divider);
}

.dashboard-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.role-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.role-admin {
  background: #fee;
  color: var(--red);
}

.role-manager {
  background: #fef3cd;
  color: var(--yellow);
}

.role-viewer {
  background: #d1ecf1;
  color: #0c5460;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--text-dark);
}

.user-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-dark);
}

.user-email {
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
}

.quick-nav,
.stats,
.recent-activity {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.nav-card {
  padding: 2rem;
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.3s;
  text-align: center;
}

.nav-card:hover {
  border-color: var(--green);
}

.nav-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-dark-secondary);
}

.nav-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.nav-card p {
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  padding: 2rem;
  background: var(--black-mute);
  color: var(--text-dark);
  border-radius: 12px;
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  opacity: 0.9;
  color: var(--text-dark-secondary);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 8px;
}

.activity-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
}

.type-create {
  background: #d4edda;
}
.type-update {
  background: #fff3cd;
}
.type-delete {
  background: #f8d7da;
}
.type-export {
  background: #cfe2ff;
}
.type-permission {
  background: #e2d9f3;
}
.type-approval {
  background: #d1ecf1;
}
.type-view {
  background: #f8f9fa;
}
.type-deactivate {
  background: #f8d7da;
}

.activity-content {
  flex: 1;
}

.activity-action {
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
  color: var(--text-dark);
}

.activity-target {
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.activity-time {
  color: var(--yellow);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
