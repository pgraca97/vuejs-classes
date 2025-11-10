<template>
  <div class="contact">
    <h1>Contacto</h1>

    <div class="contact-info">
      <div class="info-item">
        <strong>Email:</strong>
        <p>pg@example.com</p>
      </div>

      <div class="info-item">
        <strong>Telefone:</strong>
        <p>+351 912 345 678</p>
      </div>

      <div class="info-item">
        <strong>LinkedIn:</strong>
        <p>linkedin.com/in/pg</p>
      </div>

      <div class="info-item">
        <strong>GitHub:</strong>
        <p>github.com/pg</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
}
</script>

<style scoped>
.contact-info {
  display: grid;
  gap: 1.5rem;
  margin-top: 1em;
}

.info-item {
  background-color: var(--bg-soft);
  padding: 1rem;
  border: 1px solid var(--divider);
  border-radius: 8px;
}

.info-item strong {
  color: var(--text-dark-secondary);
  display: block;
  margin-bottom: 0.5rem;
}
</style>
