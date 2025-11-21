<template>
  <article>
    <div class="cart-item">
      <!-- Botão para remover item do carrinho -->
      <button @click="removeItem(item.id)" class="remove-btn" title="Remover do carrinho">✕</button>

      <div class="item-image">
        <img :src="item.imageURL" :alt="item.name" />
      </div>

      <div class="item-info">
        <h4 class="item-name">{{ item.name }}</h4>
        <p class="item-price">{{ formatPrice(item.price) }} / unidade</p>
        <!-- Alerta se stock baixo (< 3 unidades) -->
        <div v-if="item.stock <= 3" class="low-stock-alert">
          ⚠ Stock baixo: apenas {{ item.stock }} unidades
        </div>
      </div>

      <!-- Controlos de quantidade: -, input, + -->
      <div class="quantity-controls">
        <button
          @click="decrementItemQuantity(item.id)"
          class="qty-btn"
          :disabled="item.quantity <= 1"
          title="Decrementar quantidade"
        >
          −
        </button>
        <input
          type="number"
          :value="item.quantity"
          @change="handleQuantityChange"
          min="1"
          :max="item.stock"
          class="qty-input"
        />
        <button
          @click="incrementItemQuantity(item.id)"
          class="qty-btn"
          :disabled="item.quantity >= item.stock"
          title="Incrementar quantidade"
        >
          +
        </button>
      </div>
    </div>

    <!-- Subtotal deste item (price × quantity) -->
    <div class="item-subtotal">
      <span class="subtotal-value">{{ formatPrice(item.price * item.quantity) }}</span>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'pinia'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'CartItem',

  props: {
    item: {
      type: Object,
      required: true,
      // Validação: item tem de ter estrutura correta (inclui quantity)
      validator(value) {
        if (!value || typeof value !== 'object') return false
        const requiredKeys = ['id', 'name', 'price', 'stock', 'category', 'imageURL', 'quantity']
        if (!requiredKeys.every((k) => k in value)) return false
        if (typeof value.id !== 'number') return false
        if (typeof value.price !== 'number' || value.price < 0) return false
        if (!Number.isInteger(value.quantity) || value.quantity < 1) return false
        if (!Number.isInteger(value.stock) || value.stock < 0) return false
        return true
      },
    },
  },

  methods: {
    // Actions da cart store para manipular quantidade
    ...mapActions(useCartStore, [
      'incrementItemQuantity',
      'decrementItemQuantity',
      'updateItemQuantity',
      'removeItem',
    ]),

    // Handler para mudança manual do input de quantity
    handleQuantityChange(event) {
      const newQuantity = parseInt(event.target.value, 10)
      if (!Number.isNaN(newQuantity)) {
        this.updateItemQuantity(this.item.id, newQuantity)
      }
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
.cart-item {
  position: relative;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: var(--spacing-lg);
  align-items: center;
  border: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background-color: var(--bg-soft);
}

.remove-btn {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 28px;
  height: 28px;
  padding: 0;
  background: var(--color-danger);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: rgb(200, 60, 50);
  transform: scale(1.1);
}

.item-image {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 0;
}

.item-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-price {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.low-stock-alert {
  color: var(--color-warning);
  font-size: var(--font-size-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.quantity-controls {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
}

.qty-btn {
  width: 36px;
  height: 36px;
  background: var(--color-blue);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 700;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.qty-btn:hover:not(:disabled) {
  background: rgb(40, 130, 200);
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-input {
  width: 39px;
  height: 39px;
  text-align: center;
  padding: 0;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-weight: 600;
  font-size: var(--font-size-md);
  box-sizing: border-box;
}

.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.qty-input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.item-subtotal {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 100px;
}

.subtotal-value {
  color: var(--color-success);
  font-weight: 700;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: var(--spacing-md);
    padding-top: var(--spacing-xl);
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-info {
    grid-column: 2;
  }

  .quantity-controls {
    grid-column: 1 / -1;
    justify-content: center;
    margin-top: var(--spacing-sm);
  }

  .item-subtotal {
    grid-column: 1 / -1;
    align-items: center;
    margin-top: var(--spacing-xs);
  }

  .remove-btn {
    top: var(--spacing-xs);
    right: var(--spacing-xs);
  }
}
</style>
