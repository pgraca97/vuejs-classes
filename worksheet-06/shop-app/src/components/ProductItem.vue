<template>
  <article>
    <img :src="product.imageURL" :alt="product.name" />
    <h2>{{ product.name }}</h2>
    <p>{{ product.category.toUpperCase() }}</p>
    <div class="price-stock-container">
      <span>{{ product.price.toFixed(2) }} €</span>
      <!-- Classe 'low-stock' aplicada quando stock <= 3 -->
      <span :class="{ 'low-stock': product.stock <= 3 }">{{ product.stock }} in stock</span>
    </div>
    <button @click="addToCart" class="add-btn">Adicionar ao Carrinho</button>
  </article>
</template>

<script>
export default {
  name: 'ProductItem',

  props: {
    product: {
      type: Object,
      required: true,
      // Validação: objeto com estrutura correta (id, name, price, stock, etc.)
      validator(value) {
        const requiredKeys = ['id', 'name', 'price', 'stock', 'category', 'imageURL']
        if (!value || typeof value !== 'object') return false
        if (!requiredKeys.every((k) => k in value)) return false
        if (typeof value.id !== 'number' || value.id <= 0) return false
        if (typeof value.price !== 'number' || value.price < 0) return false
        if (!Number.isInteger(value.stock) || value.stock < 0) return false
        return true
      },
    },
  },

  emits: ['add-to-cart'],

  methods: {
    // Emite evento com ID do produto para o pai (App.vue)
    addToCart() {
      this.$emit('add-to-cart', this.product.id)
    },
  },
}
</script>

<style>
article {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

article img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

article h2 {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

article p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.price-stock-container {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: var(--text-primary);
}

.price-stock-container span:first-child {
  color: var(--color-success);
}

.price-stock-container span:last-child {
  color: var(--text-secondary);
}

.price-stock-container span:last-child.low-stock {
  color: var(--color-warning);
}

article button.add-btn {
  margin-top: var(--spacing-xs);
  padding: var(--spacing-sm);
  background-color: var(--bg-soft);
  color: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

article button:hover {
  background-color: var(--bg-secondary);
}
</style>
