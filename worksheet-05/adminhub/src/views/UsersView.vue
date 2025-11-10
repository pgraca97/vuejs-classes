<template>
  <div class="users-view">
    <header class="users-header">
      <div>
        <h1>Gestão de Utilizadores</h1>
        <p>{{ filteredUsers.length }} utilizadores encontrados</p>
      </div>

      <!-- Filtros -->
      <div class="filters">
        <select v-model="filterRole" class="filter-select">
          <option value="">Todos os roles</option>
          <option value="admin">Administradores</option>
          <option value="manager">Gestores</option>
          <option value="viewer">Visualizadores</option>
        </select>

        <select v-model="filterStatus" class="filter-select">
          <option value="">Todos os estados</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
      </div>
    </header>

    <!-- Tabela de utilizadores -->
    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
            <th>Departamento</th>
            <th>Estado</th>
            <th>Último Login</th>
            <th v-if="currentUser.role === 'admin' || currentUser.role === 'manager'">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>
              <img :src="user.avatar" :alt="user.name" class="user-avatar" />
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge" :class="`role-${user.role}`">
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            <td>{{ user.department }}</td>
            <td>
              <span class="status-badge" :class="{ active: user.active }">
                {{ user.active ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td>{{ formatDate(user.lastLogin) }}</td>
            <td v-if="currentUser.role === 'admin' || currentUser.role === 'manager'">
              <button @click="viewDetails(user)" class="action-button view" title="Ver detalhes">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-eye-icon lucide-eye"
                >
                  <path
                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              <button
                @click="editUser(user)"
                class="action-button edit"
                title="Editar"
                :disabled="user.id === currentUser.id"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-pencil-icon lucide-pencil"
                >
                  <path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                  />
                  <path d="m15 5 4 4" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal simples para mostrar detalhes -->
    <div v-if="selectedUser" class="modal-overlay" @click="selectedUser = null">
      <div class="modal-content" @click.stop>
        <h2>Detalhes do Utilizador</h2>
        <div class="modal-details">
          <p><strong>Nome:</strong> {{ selectedUser.name }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Username:</strong> {{ selectedUser.username }}</p>
          <p><strong>Role:</strong> {{ getRoleLabel(selectedUser.role) }}</p>
          <p><strong>Departamento:</strong> {{ selectedUser.department }}</p>
          <p><strong>Estado:</strong> {{ selectedUser.active ? 'Ativo' : 'Inativo' }}</p>
          <p><strong>Último Login:</strong> {{ formatDate(selectedUser.lastLogin) }}</p>
        </div>
        <button @click="selectedUser = null" class="close-button">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'
import { users } from '@/data/adminhub-data.js'

export default {
  name: 'UsersView',

  data() {
    return {
      users,
      currentUser: null,
      filterRole: '',
      filterStatus: '',
      selectedUser: null,
    }
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        // Filtro por role
        if (this.filterRole && user.role !== this.filterRole) {
          return false
        }

        // Filtro por estado
        if (this.filterStatus === 'active' && !user.active) {
          return false
        }
        if (this.filterStatus === 'inactive' && user.active) {
          return false
        }

        return true
      })
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
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },

    viewDetails(user) {
      this.selectedUser = user
    },

    editUser(user) {
      alert(`Funcionalidade de edição para ${user.name} (a implementar)`)
    },
  },

  created() {
    this.currentUser = authStore.getUser()
  },
}
</script>

<style scoped>
.users-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.users-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.users-header p {
  color: var(--text-dark-secondary);
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
}

.users-table-container {
  background: var(--black-mute);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table thead {
  background: var(--bg-soft);
}

.users-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-dark);
  border-bottom: 2px solid var(--divider);
}

.users-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--divider);
  color: var(--text-dark);
}

.users-table tbody tr:hover {
  background-color: var(--black-muted);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.role-badge,
.status-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
}

.role-admin {
  background: #fee;
  color: #c33;
}

.role-manager {
  background: #fef3cd;
  color: #856404;
}

.role-viewer {
  background: #d1ecf1;
  color: #0c5460;
}

.status-badge {
  background: #f8d7da;
  color: #721c24;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.action-button {
  padding: 0.5rem;
  margin: 0 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s;
  color: var(--text-dark);
}

.action-button:hover:not(:disabled) {
  transform: scale(1.2);
}

.action-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.modal-details p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: var(--text-dark);
}

.modal-details strong {
  color: var(--text-dark-secondary);
}

.close-button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.close-button:hover {
  background: var(--black-muted);
}
</style>
