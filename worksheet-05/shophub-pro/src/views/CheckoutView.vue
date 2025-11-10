<template>
  <div class="checkout-view">
    <h1>Finalizar Compra</h1>

    <div class="checkout-content">
      <!-- Formulário de checkout -->
      <div class="checkout-form">
        <h2>Informação de Envio</h2>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nome Completo *</label>
            <input id="name" type="text" v-model="form.name" required minlength="3" />
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input id="email" type="email" v-model="form.email" required />
          </div>

          <div class="form-group">
            <label for="address">Morada *</label>
            <textarea
              id="address"
              v-model="form.address"
              required
              minlength="10"
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">Cidade *</label>
              <input id="city" type="text" v-model="form.city" required />
            </div>

            <div class="form-group">
              <label for="postalCode">Código Postal *</label>
              <input
                id="postalCode"
                type="text"
                v-model="form.postalCode"
                required
                pattern="[0-9]{4}-[0-9]{3}"
                placeholder="1234-567"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Telefone *</label>
            <input
              id="phone"
              type="tel"
              v-model="form.phone"
              required
              pattern="[0-9]{9}"
              placeholder="912345678"
            />
          </div>

          <!-- Mensagem de erro se houver -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="submit-button">Confirmar Compra</button>
        </form>
      </div>

      <!-- Resumo do pedido -->
      <div class="order-summary">
        <h2>Resumo do Pedido</h2>

        <div class="summary-items">
          <div v-for="item in cartItems" :key="item.id" class="summary-item">
            <img :src="item.image" :alt="item.name" />
            <div class="item-details">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">Qtd: {{ item.quantity }}</p>
            </div>
            <p class="item-price">{{ formatPrice(item.price * item.quantity) }}</p>
          </div>
        </div>

        <hr />

        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>

        <div class="summary-row">
          <span>Envio</span>
          <span>{{ shipping === 0 ? 'Grátis' : formatPrice(shipping) }}</span>
        </div>

        <hr />

        <div class="summary-row total">
          <span>Total</span>
          <span>{{ formatPrice(total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '@/stores/cart.js'

export default {
  name: 'CheckoutView',

  data() {
    return {
      cartItems: [],
      form: {
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
      },
      errorMessage: '',
    }
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    },

    shipping() {
      return this.subtotal >= 100 ? 0 : 5.99
    },

    total() {
      return this.subtotal + this.shipping
    },
  },

  methods: {
    handleSubmit() {
      this.processCheckout()
    },

    // NOTA: Validação de Stock
    //
    // Neste exercício, o stock é decrementado imediatamente ao adicionar ao carrinho,
    // logo não é necessário revalidar no checkout.
    //
    // Numa aplicação real com backend e múltiplos utilizadores, o fluxo seria:
    // 1. Adicionar ao carrinho: stock é "reservado" (não decrementado)
    // 2. Reserva tem tempo limite (ex: 15 minutos)
    // 3. Checkout: revalida se reservas ainda são válidas
    // 4. Confirmação: stock é efetivamente decrementado

    processCheckout() {
      console.log('Pedido processado:', {
        customer: this.form,
        items: this.cartItems,
        total: this.total,
      })

      // Limpa carrinho após confirmação
      cartStore.clearCart()

      // Navegação programática com replace (não adiciona ao histórico)
      // Previne que utilizador volte para checkout com botão "voltar"
      this.$router.replace({ name: 'success' })
    },

    formatPrice(price) {
      return `€${price.toFixed(2)}`
    },
  },

  created() {
    this.cartItems = cartStore.getItems()
  },
}
</script>

<style scoped>
.checkout-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
}

.checkout-form {
  font-family: inherit;
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
}

.checkout-form h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-dark-secondary);
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
}

textarea {
  resize: vertical;
}

.error-message {
  padding: 1rem;
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: 2px solid transparent;
  background:
    linear-gradient(var(--black-mute)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;

  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-button:hover {
  background:
    linear-gradient(var(--btn-hover)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;
}

.order-summary {
  background: var(--bg-soft);
  padding: 2rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.order-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 1rem;
  align-items: center;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-dark);
}

.item-quantity {
  font-size: 0.85rem;
  color: var(--text-dark-secondary);
}

.item-price {
  font-weight: bold;
  color: var(--text-dark-blue);
}

hr {
  border: none;
  border-top: 1px solid var(--divider);
  margin: 1rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--text-dark);
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: bold;
  background: -webkit-linear-gradient(300deg, #42d392 5%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-top: 1rem;
}
</style>
