<template>
  <main class="products-container">
    <!-- Cabeçalho da seção com ID para referência -->
    <header class="sr-only">
      <h1 id="products-heading">Os Nossos Produtos</h1>
    </header>

    <!-- Renderizar lista dinamicamente com :key único -->
    <!-- v-bind (ou :) para atributos dinâmicos -->
    <section class="products-grid" role="list" aria-labelledby="products-heading">
      <article
        v-for="(product, index) in products"
        :key="product.id"
        class="product-card"
        role="listitem"
        :aria-label="`Produto ${index + 1} de ${products.length}`"
      >
        <div class="product-image">
          <img
            :src="product.productImage"
            :alt="`Imagem do produto ${product.productName}`"
          />
        </div>

        <div class="product-content">
          <header>
            <h2 class="product-name">{{ product.productName }}</h2>
            <!-- :class com array e operador ternário -->
            <p
              :class="[
                'product-availability',
                product.productAvailable ? 'product-available' : 'product-unavailable',
              ]"
              :aria-label="product.productAvailable ? 'Disponível' : 'Indisponível'"
            >
              {{ product.productAvailable ? 'Disponível' : 'Indisponível' }}
            </p>
          </header>

          <!-- Alternativa estruturada ao v-html (mais seguro) -->
          <ul class="product-specs">
            <li v-for="spec in getProductSpecs(product)" :key="spec">{{ spec }}</li>
          </ul>

          <!-- v-html: renderiza HTML (utilizar com cuidado - pode ser vulnerável) -->
          <!-- <ul class="product-specs">
            <li v-html="product.productDesc"></li>
          </ul> -->

          <!-- v-if: renderização condicional -->
          <div v-if="shouldShowPrice(product)" class="product-price">
            <span class="sr-only">Preço:</span>
            <span :aria-label="`Preço ${product.price} euros`"> €{{ product.price }} </span>
          </div>

          <div class="product-actions">
            <!-- @click (v-on:click): event handler -->
            <button @click="resetPrice(product.id)" class="btn-reset">Repor Preço</button>
            <!-- :disabled: atributo dinâmico -->
            <button
              @click="sellProduct(product.id)"
              :disabled="!product.productAvailable"
              class="btn-sell"
            >
              {{ product.productAvailable ? 'Vender' : 'Vendido' }}
            </button>
          </div>
        </div>
      </article>
    </section>

    <!-- v-if com mensagem de estado vazio -->
    <div v-if="products.length === 0" class="empty-state" role="status" aria-live="polite">
      <p>Nenhum produto disponível no momento.</p>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ProductComp',

  data() {
    return {
      // Array de produtos (em vez de objeto único - mais escalável)
      products: [
        {
          id: 'p1',
          productName: 'Dell XPS',
          productDesc: 'Processador i7<br>Disco SSD 256GB<br> Monitor Samsung 21’',
          productImage: 'https://tinyurl.com/7sy58vpc',
          price: 1200,
          productAvailable: true,
        },
        {
          id: 'p2',
          productName: 'MacBook Pro',
          productDesc: 'Processador M1<br>Disco SSD 512GB<br> Monitor Retina 24’',
          productImage: 'https://tinyurl.com/mrfhj4kf',
          price: 400,
          productAvailable: false,
        },
        {
          id: 'p3',
          productName: 'Asus ZenBook',
          productDesc: 'Processador i5<br>Disco SSD 256GB<br> Monitor Asus 21’',
          productImage: 'https://m.media-amazon.com/images/I/61c0nRviqmL._AC_SX679_.jpg',
          price: 1350,
          productAvailable: true,
        },
      ],
      // Armazena preços originais para permitir reset
      originalPrices: {},
    }
  },

  methods: {
    // Converte string HTML (com <br>) em array de especificações
    getProductSpecs(product) {
      return product.productDesc
        .split('<br>')
        .map((spec) => spec.trim())
        .filter((spec) => spec)
    },

    // Lógica de negócio: quando mostrar o preço
    // (apenas se >= 0 e < 1200)
    shouldShowPrice(product) {
      return typeof product.price === 'number' && product.price >= 0 && product.price < 1200
    },

    // Reset do preço original do produto
    resetPrice(id) {
      if (!id || !Object.prototype.hasOwnProperty.call(this.originalPrices, id)) {
        return
      }

      const productIndex = this.products.findIndex((p) => p.id === id)

      if (productIndex === -1) {
        return
      }

      // Reatribui o valor original guardado
      this.products[productIndex].price = this.originalPrices[id]
    },

    // Marca produto como vendido (indisponível)
    sellProduct(id) {
      if (!id) {
        return
      }

      const productIndex = this.products.findIndex((p) => p.id === id)

      if (productIndex === -1) {
        return
      }

      // Altera disponibilidade (Vue atualiza UI automaticamente)
      this.products[productIndex].productAvailable = false
    },
  },

  // Lifecycle Hook: executa quando componente é criado
  created() {
    // Guarda preços originais para poder fazer reset depois
    this.products.forEach((product) => {
      this.originalPrices[product.id] = product.price
    })
  },
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.products-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.product-card {
  background: rgb(255, 255, 255);
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #eee;
  max-width: 400px;
  padding: 1rem;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-actions {
  display: flex;
  align-items: end;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1;
}

.product-card button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  height: fit-content;
}

.product-card button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-reset {
  background-color: #42b883 !important;
}

.btn-sell {
  background-color: #ff6b6b !important;
}

.btn-sell:disabled {
  background-color: #ccc !important;
}

.product-availability {
  font-weight: light;
  font-style: italic;
  color: rgb(124, 124, 124);
  margin: 0;
}

.product-available {
  color: #42b883;
}

.product-unavailable {
  color: #ff4d4f;
}

.product-image img {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.product-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.product-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.product-specs {
  display: flex;
  flex-direction: column;
  justify-content: center;

  list-style: none;
  padding: 0;
  margin: 0;
}

.product-specs li {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  padding: 0.25rem 0;
  border-left: 3px solid #42b883;
  padding-left: 0.75rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #42b883;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}
</style>
