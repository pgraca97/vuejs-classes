<template>
  <div class="home">
    <h1>Welcome to Tech Blog</h1>
    <p>
      Explora artigos sobre tecnologia, desenvolvimento web e as últimas tendências do mundo da
      programação.
    </p>
    <RouterLink to="/articles" class="cta-button"> Ver Artigos </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.cta-button {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  padding: 1rem 2rem;
  border-radius: 8px;
  line-height: 1.7;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.cta-button:hover {
  background-color: var(--black-muted);
  color: var(--green);
}
</style>
