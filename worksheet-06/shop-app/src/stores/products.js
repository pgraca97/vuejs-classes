import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [], // Catálogo de produtos
  }),

  getters: {},

  actions: {
    // Carrega produtos do ficheiro data/products.js (simulação assíncrona)
    async setProducts() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const module = await import('@/data/products.js')
        this.products = module.default
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        this.products = []
      }
    },

    // Decrementa stock quando produto é adicionado ao carrinho
    decrementStock(productId, quantity = 1) {
      const product = this.products.find((p) => p.id === productId)
      if (product && product.stock >= quantity) {
        product.stock -= quantity
      }
    },

    // Incrementa stock quando produto é removido do carrinho
    incrementStock(productId, quantity = 1) {
      const product = this.products.find((p) => p.id === productId)
      if (product) {
        product.stock += quantity
      }
    },

    // Retorna produto por ID (utilizado pela cart store)
    getProductById(productId) {
      return this.products.find((p) => p.id === productId)
    },
  },

  // Persistir stock dos produtos em localStorage
  persist: {
    paths: ['products'],
    storage: localStorage,
  },
})
