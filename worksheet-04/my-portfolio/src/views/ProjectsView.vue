<template>
  <div class="projects">
    <h1>Os Meus Projetos</h1>

    <div class="project-list">
      <div class="project-card">
        <h2>E-commerce Platform</h2>
        <p>
          Uma plataforma completa de e-commerce desenvolvida com Vue 3 e Node.js, incluindo carrinho
          de compras, pagamentos e gestão de inventário.
        </p>
      </div>

      <div class="project-card">
        <h2>Task Manager App</h2>
        <p>
          Aplicação de gestão de tarefas com drag-and-drop, colaboração em tempo real e integração
          com calendário.
        </p>
      </div>

      <div class="project-card">
        <h2>Weather Dashboard</h2>
        <p>
          Dashboard meteorológico interativo que consome APIs de clima e apresenta previsões com
          gráficos e mapas.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsView',
}
</script>

<style scoped>
.project-list {
  display: grid;
  gap: 2rem;
  margin-top: 1em;
}

.project-card {
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  padding: 1.5rem;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  transition: background-color 0.3s ease;
}

.project-card:hover {
  cursor: pointer;
  user-select: none;

  background-color: var(--black-muted);
}

.project-card h2 {
  color: var(--text-dark-secondary);
  margin: 0;
}
</style>
