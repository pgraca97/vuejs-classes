<template>
  <div class="users-view">
    <div class="users-header">
      <p class="subtitle">Manage user accounts and permissions</p>
    </div>

    <!-- Tabela de utilizadores -->
    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td data-label="Name">
              <div class="user-name">
                <div class="user-avatar">{{ getInitials(user.name) }}</div>
                <span>{{ user.name }}</span>
              </div>
            </td>
            <td data-label="Email">{{ user.email }}</td>
            <td data-label="Role">
              <span class="role-badge" :class="getRoleBadgeClass(user.role)">
                {{ user.role }}
              </span>
            </td>
            <td data-label="Status">
              <span class="status-badge" :class="user.status.toLowerCase()">
                {{ user.status }}
              </span>
            </td>
            <td data-label="Actions">
              <RouterLink
                :to="`/dashboard/users/${user.id}`"
                class="view-button"
              >
                View Details
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { users } from '@/data/users.js'

export default {
  name: 'UsersView',
  data() {
    return {
      users: users,
    }
  },
  methods: {
    getInitials(name) {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    },
    getRoleBadgeClass(role) {
      const classes = {
        Administrator: 'admin',
        Editor: 'editor',
        Viewer: 'viewer',
      }
      return classes[role] || ''
    },
  },
}
</script>

<style scoped>
.users-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.users-header .subtitle {
  color: var(--text-dark-secondary);
  margin: 0;
}

/* Tabela */
.users-table-container {
  background: var(--bg-soft);
  border-radius: 12px;
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table thead {
  background-color: var(--black-mute);
}

.users-table th {
  text-align: left;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: var(--text-dark-secondary);
  border-bottom: 1px solid var(--divider);
}

.users-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--divider);
  color: var(--text-dark);
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.users-table tbody tr:hover {
  background-color: var(--black-muted);
}

.user-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.role-badge.admin {
  color: palevioletred;
}

.role-badge.editor {
  color: papayawhip;
}

.role-badge.viewer {
  color: paleturquoise;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.active {
  border: 1px solid var(--green);
  color: var(--green);
}

.status-badge.inactive {
  border: 1px solid var(--red);
  color: var(--red);
}

.view-button {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.view-button:hover {
  background-color: var(--black-muted);
}


@media (max-width: 767px) {
  .users-table-container {
    background: transparent;
  }

  .users-table thead {
    display: none;
  }

  .users-table,
  .users-table tbody,
  .users-table tr,
  .users-table td {
    display: block;
    width: 100%;
  }

  .users-table tr {
    margin-bottom: 1rem;
    background: var(--bg-soft);
    border: 1px solid var(--divider);
    border-radius: 8px;
    padding: 1rem;
  }

  .users-table tr:hover {
    background: var(--bg-soft);
  }

  .users-table td {
    padding: 0.75rem 0;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .users-table td:last-child {
    padding-bottom: 0;
  }

  .users-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--text-dark-secondary);
    min-width: 80px;
  }

  .user-name {
    flex: 1;
    justify-content: flex-end;
  }

  .view-button {
    margin-left: auto;
  }
}
</style>