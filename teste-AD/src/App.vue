<template>
  <header class="app-header">
    <nav class="main-nav">
      <router-link to="/" class="nav-brand"> Menu Backoffice </router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-link">Pratos</router-link>
        <router-link :to="{ name: 'dish-create' }" class="nav-link"> + Novo Prato </router-link>
      </div>
    </nav>
  </header>

  <main class="app-main">
    <router-view />
  </main>

  <footer class="app-footer">
    <p>Menu Backoffice © {{ currentYear }} | Exame PWI - AD</p>
  </footer>
</template>

<script>
export default {
  name: 'App',

  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style>
.app-header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-nav {
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--accent-primary);
  text-decoration: none;
}

.nav-brand:hover {
  color: var(--accent-hover);
}

.nav-links {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
  font-size: var(--font-size-sm);
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 45px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.router-link-active {
  color: var(--accent-primary);
  font-weight: 600;
  position: relative;
  border-bottom: 1px solid var(--accent-primary);
  bottom: -1px;
}

.app-main {
  min-height: calc(100vh - 140px);
  padding: var(--spacing-lg) 0;
}

.app-footer {
  text-align: center;
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}
</style>
