<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [
        {
          id: self.crypto.randomUUID(),
          name: 'Teclado Mecânico Asus ROG Strix Scope RGB PT RX Red',
          price: 59.9,
          image: 'https://tinyurl.com/a8jwnm7h',
          inStock: true,
        },
        {
          id: self.crypto.randomUUID(),
          name: 'Rato Óptico Lenovo Legion M410 Wireless RGB Gaming 16000DPI Preto',
          price: 39.99,
          image: 'https://tinyurl.com/2t66setf',
          inStock: false,
        },
        {
          id: self.crypto.randomUUID(),
          name: 'Monitor Silver Storm IPS 24" FHD 16:9 100Hz FreeSync',
          price: 69.9,
          image: 'https://tinyurl.com/5bxb6zds',
          inStock: true,
        },
        {
          id: self.crypto.randomUUID(),
          name: 'Cadeira Gaming MSI MAG CH120 X Preta',
          price: 149.9,
          image: 'https://tinyurl.com/2y338sz6',
          inStock: true,
        },
      ],
    }
  },
  methods: {
    handleAddToCart(productId) {
      if (!productId) return
      const product = this.products.find((p) => p.id === productId)
      if (!product) return
      if (!product.inStock) return // evita duplicados

      // marcar imediatamente (optimistic update)
      product.inStock = false

      // mostrar mensagem não-blocking — aqui uso alert por simplicidade
      alert(`Produto ${product.name} adicionado ao carrinho!`)
    },
    toggleRandomStock() {
      // Escolhe um produto aleatório e inverte o seu stock
      const randomIndex = Math.floor(Math.random() * this.products.length)
      this.products[randomIndex].inStock = !this.products[randomIndex].inStock
    },
  },
}
</script>

<template>
  <div class="product-list">
    <button @click="toggleRandomStock" class="stock-toggle-btn">Alterar Stock Aleatório</button>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<style scoped>
.stock-toggle-btn {
  font-family: 'inter-variable', 'Inter', sans-serif;
  background-color: var(--black-mute);
  transition: background-color 0.5s;
  padding: 5px 12px;
  border: 1px solid var(--divider);
  border-radius: 4px;
  font-size: 0.9em;
  font-weight: 600;
  color: var(--text-dark);
  cursor: pointer;
  line-height: 1.7;
  margin-block-end: 1rem;
}

.stock-toggle-btn:hover {
  background-color: var(--black-muted);
}

.stock-toggle-btn:active {
  transform: translateY(0px) scale(0.98);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
  gap: 1.5rem;
}
</style>
