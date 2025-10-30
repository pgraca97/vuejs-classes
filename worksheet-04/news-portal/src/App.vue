<template>
  <nav class="navbar">
    <div class="container navbar-content">
      <p @click="$router.push('/')">News Portal</p>

      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
      </div>
    </div>
  </nav>

  <div class="layout">
    <!-- NAMED VIEW: Banner -->
    <!-- Este RouterView renderiza o componente definido em "banner" -->
    <div class="banner-area">
      <RouterView name="banner" />
    </div>

    <div class="main-layout">
      <!-- NAMED VIEW: Sidebar -->
      <!-- Este RouterView renderiza o componente definido em "sidebar" -->
      <aside class="sidebar-area" v-if="!$route.meta.hideSidebar">
        <RouterView name="sidebar" />
      </aside>

      <!-- DEFAULT VIEW: Content principal -->
      <!-- Este RouterView renderiza o componente definido em "default" -->
      <main class="content-area">
        <RouterView />
      </main>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <p>News Portal &copy; 2025</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid rgba(84, 84, 84, 0.65);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 16px 12px;
  padding-block: 0;
}

.nav-links {
  display: flex;
  align-items: center;
}

.navbar a {
  color: var(--text-dark);
  font-weight: 500;
  font-size: 0.813rem;
  text-decoration: none;
  padding-inline: 0.75rem;
  line-height: 54px;
  user-select: none;
}

.navbar a.router-link-active {
  position: relative;
  border-bottom: 1px solid var(--green);
  bottom: -1px;
}

.navbar p {
  padding-inline: 0.75rem;
  cursor: pointer;
}

/* Layout */
.layout {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.banner-area {
  padding: 2rem;
}

.main-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 0 2rem 2rem 2rem;
}

.footer {
  border-top: 1px solid rgba(84, 84, 84, 0.65);
}

.footer .container {
  color: var(--text-dark-secondary);
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 24px 0;
}

.footer p {
  margin: 0;
}
</style>
