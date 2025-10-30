<template>
  <nav class="navbar">
    <div class="container navbar-content">
      <!-- Título do portfolio com link para a página inicial -->
      <p @click="$router.push('/')">My Portfolio</p>

      <!-- Links para navegar entre as páginas -->
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </div>
    </div>
  </nav>

  <!-- Área principal onde o componente da rota atual é renderizado -->
  <main class="content">
    <div class="container">
      <RouterView />
    </div>
  </main>

  <!-- Footer fixo no fundo da página -->
  <footer class="footer">
    <div class="container">
      <p>&copy; PG - 2025/2026</p>
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

.content {
  flex: 1;
}

.content .container > div {
  max-width: 688px;
  width: 100%;
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
