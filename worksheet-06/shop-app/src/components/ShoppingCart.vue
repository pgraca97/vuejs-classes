<template>
  <!-- Lista de items no carrinho -->
  <div class="cart-items">
    <CartItem v-for="item in cartItems" :key="item.id" :item="item" />
    <button @click="clearCart" :disabled="isCartEmpty">Limpar Carrinho</button>
  </div>

  <!-- Sidebar: desconto + resumo financeiro -->
  <div class="cart-sidebar">
    <!-- Secção de código de desconto -->
    <div class="discount-container">
      <h3>Discount</h3>
      <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Enter discount code" v-model="discountText" />
        <button type="submit">Apply</button>
      </form>
    </div>

    <!-- Resumo financeiro detalhado -->
    <div class="cart-summary">
      <h3>Summary</h3>
      <div class="summary-content">
        <p>
          <span>Subtotal</span><span>{{ formatPrice(cartSubtotal) }}</span>
        </p>

        <!-- Desconto (só aparece se código aplicado) -->
        <p v-if="discountCode" class="discount">
          <span>Discount ({{ discountCode }})</span><span>-{{ formatPrice(discountValue) }}</span>
        </p>

        <p>
          <span>IVA (23%)</span><span>{{ formatPrice(taxAmount) }}</span>
        </p>
        <p class="total">
          <span>Total</span><span>{{ formatPrice(cartTotal) }}</span>
        </p>
      </div>
      <hr />
      <p>Total Items: {{ cartItemsCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '@/stores/cart'
import CartItem from './CartItem.vue'

export default {
  name: 'ShoppingCart',

  components: {
    CartItem,
  },

  data() {
    return {
      discountText: '', // Input do código de desconto
    }
  },

  computed: {
    // Getters da cart store para mostrar resumo financeiro
    ...mapState(useCartStore, [
      'cartItems',
      'cartSubtotal',
      'cartTotal',
      'cartItemsCount',
      'discountCode',
      'discountValue',
      'taxAmount',
      'isCartEmpty',
    ]),
  },

  methods: {
    // Actions para aplicar desconto e limpar carrinho
    ...mapActions(useCartStore, ['applyDiscountCode', 'clearCart']),

    // Handler do formulário de desconto
    handleSubmit() {
      this.applyDiscountCode(this.discountText)
      this.discountText = '' // Limpar input após submissão
    },

    // Formata valores monetários para pt-PT
    formatPrice(value) {
      return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2,
      }).format(value)
    },
  },
}
</script>

<style scoped>
.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cart-items button {
  font-family: inherit;
  font-size: var(--font-size-md);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-danger);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: filter 0.3s ease;
}

.cart-items button:hover:not(:disabled) {
  filter: brightness(0.9);
}

.cart-items button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.discount-container,
.cart-summary {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.discount-container form {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.discount-container input {
  flex: 1;
  background-color: var(--bg-soft);
  font-family: inherit;
  color: var(--color-white);
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-size-md);
}

.discount-container input::placeholder {
  color: var(--text-secondary);
}

.discount-container input:focus {
  outline: none;
  border-color: var(--border-color-hover);
}

.discount-container button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-soft);
  color: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.discount-container button:hover {
  color: var(--border-color-hover);
  border-color: var(--border-color-hover);
}

.cart-summary .summary-content p {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-md);
  padding-bottom: calc(var(--spacing-md) - 1px);
  border-bottom: 1px solid var(--border-color);
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.cart-summary .summary-content p.discount {
  color: var(--color-success);
}

.cart-summary .summary-content p.total {
  color: var(--color-blue);
  font-weight: 700;
  border: none;
  padding-bottom: 0;
}

.cart-summary p {
  color: var(--text-secondary);
  font-weight: light;
  justify-self: center;
  border: none;
}
</style>
