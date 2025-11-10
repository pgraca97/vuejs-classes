<template>
  <div class="profile-view">
    <h1>Perfil do Utilizador</h1>

    <div class="profile-content">
      <!-- Card com informação principal -->
      <div class="profile-card">
        <div class="profile-header">
          <img :src="user.avatar" :alt="user.name" class="profile-avatar" />
          <div class="profile-main-info">
            <h2>{{ user.name }}</h2>
            <p class="role-badge" :class="`role-${user.role}`">
              {{ getRoleLabel(user.role) }}
            </p>
            <p class="status-badge" :class="{ active: user.active }">
              {{ user.active ? 'Ativo' : 'Inativo' }}
            </p>
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-label">Email:</span>
            <span class="detail-value">{{ user.email }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Username:</span>
            <span class="detail-value">{{ user.username }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Departamento:</span>
            <span class="detail-value">{{ user.department }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">ID:</span>
            <span class="detail-value">#{{ user.id }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Último Login:</span>
            <span class="detail-value">{{ formatDate(user.lastLogin) }}</span>
          </div>
        </div>
      </div>

      <!-- Permissões do utilizador -->
      <div class="permissions-card">
        <h3>Permissões</h3>
        <p class="permissions-intro">
          Com o teu role de <strong>{{ getRoleLabel(user.role) }}</strong
          >, tens acesso às seguintes áreas:
        </p>
        <ul class="permissions-list">
          <li :class="{ allowed: true }">✓ Dashboard</li>
          <li :class="{ allowed: true }">✓ Perfil</li>
          <li :class="{ allowed: canAccessUsers }">
            {{ canAccessUsers ? '✓' : '✗' }} Gestão de Utilizadores
          </li>
          <li :class="{ allowed: canAccessAnalytics }">
            {{ canAccessAnalytics ? '✓' : '✗' }} Analytics
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'

export default {
  name: 'ProfileView',

  data() {
    return {
      user: null,
    }
  },

  computed: {
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

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },

  created() {
    this.user = authStore.getUser()
  },
}
</script>

<style scoped>
.profile-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
}

.profile-card,
.permissions-card {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 12px;
  padding: 2rem;
}

.profile-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--divider);
  color: var(--text-dark);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--text-dark-blue);
}

.profile-main-info {
  flex: 1;
}

.profile-main-info h2 {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.role-badge,
.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
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

.status-badge {
  background: #f8d7da;
  color: var(--red);
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--divider);
}

.detail-label {
  font-weight: 600;
  color: var(--text-dark-secondary);
}

.detail-value {
  color: var(--text-dark);
}

.permissions-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.permissions-intro {
  color: var(--text-dark-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.permissions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.permissions-list li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
}

.permissions-list li.allowed {
  background: #d4edda;
  color: #155724;
}

.permissions-list li:not(.allowed) {
  background: #f8d7da;
  color: #721c24;
}

.logout-button {
  padding: 1rem 2rem;
  background: var(--red);
  color: var(--text-dark);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-button:hover {
  background: #c82333;
}
</style>
