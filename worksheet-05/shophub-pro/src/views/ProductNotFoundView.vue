<template>
  <div class="not-found-view">
    <div class="not-found-card">
      <div class="error-icon">404</div>

      <h1>Produto Não Encontrado</h1>

      <p class="error-message">
        Desculpa, mas o produto que estás à procura não existe ou foi removido.
      </p>

      <div class="suggestions">
        <p>Aqui estão algumas sugestões:</p>
        <ul>
          <li>Verifica se o link está correto</li>
          <li>Explora a nossa lista de produtos</li>
          <li>Procura por categorias</li>
        </ul>
      </div>

      <div class="action-buttons">
        <router-link :to="{ name: 'products' }" class="primary-button">
          Ver Todos os Produtos
        </router-link>

        <router-link :to="{ name: 'home' }" class="secondary-button">
          Voltar à Página Inicial
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductNotFoundView',
}
</script>

<style scoped>
.not-found-view {
  max-width: 1200px;
  height: 95%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.not-found-card {
  background: var(--bg-soft);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.error-icon {
  font-size: 5rem;
  font-weight: bold;
  color: var(--red);
}

h1 {
  font-size: 2.5rem;

  color: var(--text-dark);
}

.error-message {
  font-size: 1.1rem;
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
}

.suggestions {
  background: var(--black-mute);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: left;
}

.suggestions p {
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.suggestions ul {
  list-style-position: inside;
  color: var(--text-dark-secondary);
}

.suggestions li {
  margin-bottom: 0.5rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button {
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.primary-button {
  background: var(--black-mute);
  color: var(--text-dark);
}

.primary-button:hover {
  background: var(--btn-hover);
}

.secondary-button {
  border: 2px solid transparent;
  background:
    linear-gradient(var(--black-mute)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;

  color: var(--text-dark-blue);
}

.secondary-button:hover {
  background:
    linear-gradient(var(--btn-hover)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;
}
</style>
