<template>
  <div class="not-found">
    <div class="content">
      <h1 class="error-code">404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist. It might have been moved or deleted.</p>

      <!-- Navegação programática via botão -->
      <button @click="goHome" class="home-button">Back to Home</button>

      <!-- Ou via RouterLink -->
      <RouterLink to="/" class="home-link"> Or click here to return to the gallery </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    goHome() {
      // Navegação programática para a home
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

/* Gradiente vermelho para o código de erro */
.error-code {
  font-size: 8rem;
  margin: 0;
  background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #701a05 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content h2 {
  font-size: 2rem;
  margin: 1rem 0;
}

.content p {
  color: var(--text-dark-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.home-button {
  display: inline-flex;
  inline-size: fit-content;
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

.home-button:hover {
  background-color: var(--black-muted);
}

.home-link {
  display: block;
  color: var(--green);
  text-decoration: none;
  margin-top: 1rem;
  transition: color 0.3s;
}

.home-link:hover {
  color: greenyellow;
  text-decoration: underline;
}
</style>
