<template>
  <div class="dashboard">
    <!-- Sidebar fixa -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav class="sidebar-nav">
        <RouterLink to="/dashboard" class="nav-item">
          <span>Overview</span>
        </RouterLink>

        <RouterLink to="/dashboard/users" class="nav-item">
          <span>Users</span>
        </RouterLink>

        <RouterLink to="/dashboard/settings" class="nav-item">
          <span>Settings</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button @click="handleLogout" class="logout-button">
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Área de conteúdo principal -->
    <main class="main-content">
      <!-- Header do dashboard -->
      <header class="dashboard-header">
        <h1>{{ pageTitle }}</h1>
        <div class="user-info">
          <span>Welcome, Admin</span>
        </div>
      </header>

      <!-- Aqui são renderizadas as rotas filhas -->
      <div class="content-area">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  computed: {
    // Título dinâmico baseado na rota atual
    pageTitle() {
      console.log(this.$route.path)
      const routePath = this.$route.path

      const titles = {
        '/dashboard': 'Dashboard Overview',
        '/dashboard/users': 'User Management',
        '/dashboard/settings': 'Settings',
      }

      // Para rotas dinâmicas como '/dashboard/users/:id'
      if (routePath.startsWith('/dashboard/users/')) {
        return 'User Details'
      }

      return titles[routePath] || 'Dashboard'
    },
  },
  methods: {
    handleLogout() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr;
}

.sidebar {
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0 2rem;
  gap: 1rem;
}

.sidebar-header {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.sidebar-nav {
  display: flex;
  gap: 1rem;
}

.nav-item {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-dark-secondary);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--green);
}

.nav-item.router-link-exact-active {
  color: var(--green);
}

.logout-button {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.logout-button:hover {
  background-color: var(--black-muted);
  color: var(--green);
}

.main-content {
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.user-info {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-dark-secondary);
}

@media (min-width: 768px) {
  .dashboard {
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
  }

  .sidebar {
    border-right: 1px solid var(--divider);
    padding: 2rem;
    gap: 0;
  }

  .sidebar-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .sidebar-footer {
    margin-top: auto;
  }

  /* .sidebar,
  .main-content {
    padding-right: 2rem;
  } */
}
</style>
