<template>
  <div class="success-view">
    <div class="success-card">
      <div class="success-icon">✓</div>

      <h1>Compra Confirmada!</h1>

      <p class="success-message">A tua encomenda foi processada com sucesso.</p>

      <div class="order-info">
        <p>Receberás um email de confirmação em breve com os detalhes da tua encomenda.</p>
        <p class="order-number">Número da Encomenda: #{{ orderNumber }}</p>
      </div>

      <div class="action-buttons">
        <router-link :to="{ name: 'home' }" class="primary-button">
          Voltar à Página Inicial
        </router-link>

        <router-link :to="{ name: 'products' }" class="secondary-button">
          Continuar a Comprar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessView',

  data() {
    return {
      orderNumber: '',
    }
  },

  created() {
    // Gera número de encomenda aleatório para demonstração
    this.orderNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')
  },
}
</script>

<style scoped>
.success-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.success-card {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: var(--bg-soft);
  padding: 3rem;
  border-radius: 12px;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: var(--green);
  color: var(--black-mute);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.success-message {
  font-size: 1.2rem;
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
}

.order-info {
  background: var(--black-mute);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.order-info p {
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.order-number {
  font-weight: bold;
  color: var(--text-dark-blue) !important;
  font-size: 1.1rem;
  margin-top: 1rem;
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
