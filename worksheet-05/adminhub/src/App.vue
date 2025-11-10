<template>
  <div id="app">
    <!-- Loading indicator global -->
    <LoadingIndicator />

    <!-- Header (só mostra se está autenticado) -->
    <header v-if="isAuthenticated" class="main-header">
      <div class="header-content">
        <router-link :to="{ name: 'dashboard' }" class="logo"> AdminHub </router-link>

        <nav class="main-nav">
          <router-link :to="{ name: 'dashboard' }"> Dashboard </router-link>

          <router-link :to="{ name: 'profile' }"> Perfil </router-link>

          <!-- Só mostra se tiver permissão -->
          <router-link v-if="canAccessUsers" :to="{ name: 'users' }"> Utilizadores </router-link>

          <router-link v-if="canAccessAnalytics" :to="{ name: 'analytics' }">
            Analytics
          </router-link>
        </nav>

        <div class="user-section">
          <img
            v-if="currentUser"
            :src="currentUser.avatar"
            :alt="currentUser.name"
            class="user-avatar"
          />
          <button @click="handleLogout" class="logout-button">Sair</button>
        </div>
      </div>
    </header>

    <!-- Breadcrumb (só mostra se está autenticado e não na página de login) -->
    <div v-if="isAuthenticated && $route.name !== 'login'" class="breadcrumb-container">
      <Breadcrumb />
    </div>

    <!-- Conteúdo principal -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer v-if="isAuthenticated" class="main-footer">
      <p>&copy; 2025 AdminHub. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'
import Breadcrumb from '@/components/Breadcrumb.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'

export default {
  name: 'App',

  components: {
    Breadcrumb,
    LoadingIndicator,
  },

  data() {
    return {
      currentUser: null,
      isAuthenticated: false,
      canAccessUsers: false,
      canAccessAnalytics: false,
    }
  },

  methods: {
    updateAuthState() {
      this.isAuthenticated = authStore.isAuthenticated()
      this.currentUser = authStore.getUser()
      this.canAccessUsers = authStore.canAccess(['admin', 'manager'])
      this.canAccessAnalytics = authStore.canAccess(['admin'])
    },

    handleLogout() {
      if (confirm('Tens a certeza que queres terminar sessão?')) {
        authStore.logout()

        // Navegação com replace previne voltar com botão "voltar"
        this.$router.replace({ name: 'login' })

        this.updateAuthState()
      }
    },
  },

  created() {
    this.updateAuthState()

    // Atualiza estado após cada navegação
    this.$router.afterEach(() => {
      this.updateAuthState()
    })
  },
}
</script>

<style>
.main-header {
  background-color: var(--bg);
  border-bottom: 1px solid var(--divider);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-dark);
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.main-nav a {
  text-decoration: none;
  color: var(--text-dark-secondary);
  font-weight: 500;
  font-size: 0.813rem;
  line-height: 54px;

  transition: color 0.2s;
}

.main-nav a:hover {
  color: var(--green);
}

.main-nav a.router-link-active {
  color: var(--green);
  font-weight: 600;
  position: relative;
  border-bottom: 1px solid var(--green);
  bottom: -1px;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--text-dark);
}

.logout-button {
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--red);
  border: 2px solid var(--red);
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.logout-button:hover {
  background: var(--red);
  color: var(--text-dark);
}

.breadcrumb-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

main {
  flex: 1;
}

.main-footer {
  background: var(--bg);
  color: var(--text-dark-secondary);
  border-top: 1px solid var(--divider);
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
}

.main-footer p {
  font-size: 0.9rem;
}
</style>
