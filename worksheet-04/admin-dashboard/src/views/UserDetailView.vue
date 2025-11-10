<template>
  <div class="user-detail">
    <!-- User not found -->
    <div v-if="!user" class="not-found">
      <h2>User Not Found</h2>
      <p>The user you're looking for doesn't exist or may have been removed.</p>
      <button @click="goBack" class="back-button">
        <span class="back-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </span>
        Back to Users
      </button>
    </div>

    <!-- User details -->
    <div v-else>
      <!-- Header com botão voltar -->
      <div class="detail-header">
        <button @click="goBack" class="back-button">
          <span class="back-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-left-icon lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </span>
          Back to Users
        </button>
      </div>

      <!-- Informação do utilizador -->
      <div class="user-card">
        <div class="user-avatar-large">
          {{ getInitials(user.name) }}
        </div>

        <div class="user-main-info">
          <h2>{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <span class="status-badge" :class="user.status.toLowerCase()">
            {{ user.status }}
          </span>
        </div>
      </div>

      <!-- Detalhes completos -->
      <div class="details-grid">
        <div class="detail-section">
          <h3>Account Information</h3>
          <div class="detail-items">
            <div class="detail-item">
              <span class="detail-label">Role:</span>
              <span class="detail-value">{{ user.role }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Department:</span>
              <span class="detail-value">{{ user.department }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Join Date:</span>
              <span class="detail-value">{{ formatDate(user.joinDate) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value">{{ user.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserById } from '@/data/users.js'

export default {
  name: 'UserDetailView',
  computed: {
    user() {
      // Obtém o ID da rota e procura o utilizador
      const userId = this.$route.params.id
      return getUserById(userId)
    },
  },
  methods: {
    // Navegação programática de volta à lista de utilizadores
    goBack() {
      this.$router.push('/dashboard/users')
    },

    getInitials(name) {
      return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.not-found h2 {
  color: var(--red);
  margin-bottom: 0.75rem;
}

.not-found p {
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.detail-header {
  margin-bottom: 1.5rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

.back-button:hover {
  background-color: var(--black-muted);
}

.back-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-card {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  padding: 2rem;
  border-radius: 12px;

  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.user-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2rem;
}

.user-main-info h2 {
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.user-email {
  color: var(--text-dark-secondary);
  margin-bottom: 1rem;
  word-break: break-all;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
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

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.detail-section {
  background: var(--bg-soft);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--divider);
}

.detail-section h3 {
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

.detail-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;

  justify-content: space-between;
  padding: 0.75rem;
  background-color: var(--black-mute);
  border-radius: 6px;
}

.detail-label {
  color: var(--text-dark-secondary);
  font-weight: 500;
}

.detail-value {
  color: var(--text-dark);
}

@media (min-width: 768px) {
  .user-card {
    flex-direction: row;
    justify-content: space-between;
    text-align: right;
    max-width: 600px;
  }

  .detail-section {
    max-width: 600px;
  }
}
</style>
