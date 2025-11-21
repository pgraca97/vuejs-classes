import { defineStore } from 'pinia'
import { useProductsStore } from './products'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [], // Array de items no carrinho
    discountCode: '', // Código de desconto aplicado
    discountPercentage: 0, // Percentagem de desconto (0-100)
  }),

  getters: {
    // Subtotal: soma de (price × quantity) de todos os items
    cartSubtotal: (state) => {
      return state.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },

    // Valor do desconto em euros
    discountValue() {
      return (this.cartSubtotal * this.discountPercentage) / 100
    },

    // Total após aplicar desconto
    totalAfterDiscount() {
      return this.cartSubtotal - this.discountValue
    },

    // IVA a 23% calculado sobre total após desconto
    taxAmount() {
      return this.totalAfterDiscount * 0.23
    },

    // Total final incluindo IVA
    cartTotal() {
      return this.totalAfterDiscount + this.taxAmount
    },

    // Soma de todas as quantities no carrinho
    cartItemsCount: (state) => {
      return state.cartItems.reduce((count, item) => {
        return count + item.quantity
      }, 0)
    },

    // Verifica se carrinho está vazio
    isCartEmpty: (state) => {
      return state.cartItems.length === 0
    },
  },

  actions: {
    // Adiciona produto ao carrinho (incrementa quantity se já existir)
    addItem(id) {
      const productsStore = useProductsStore()
      const product = productsStore.getProductById(id)

      if (!product) return

      // Validação: stock tem de estar disponível
      if (!product.stock) {
        alert('Stock insuficiente para adicionar este produto.')
        return
      }

      const cartItem = this.cartItems.find((item) => item.id === id)

      if (cartItem) {
        // Item já existe: incrementar quantity
        cartItem.quantity++
        productsStore.decrementStock(id, 1)
      } else {
        // Item novo: adicionar ao carrinho
        this.cartItems.push({
          ...product,
          quantity: 1,
        })
        productsStore.decrementStock(id, 1)
      }
    },

    // Remove item do carrinho e devolve stock ao produto
    removeItem(id) {
      const productsStore = useProductsStore()
      const cartItem = this.cartItems.find((item) => item.id === id)

      if (cartItem) {
        productsStore.incrementStock(id, cartItem.quantity)
        this.cartItems = this.cartItems.filter((item) => item.id !== id)
      }
    },

    // Atualiza quantity manualmente (validação: mínimo 1, máximo = stock disponível)
    updateItemQuantity(id, quantity) {
      const productsStore = useProductsStore()
      const cartItem = this.cartItems.find((item) => item.id === id)
      const product = productsStore.getProductById(id)

      if (!cartItem || !product) return

      const currentQuantity = cartItem.quantity
      const stockAvailable = product.stock + currentQuantity
      const newQuantity = Math.max(1, Math.min(quantity, stockAvailable))

      if (newQuantity > stockAvailable) {
        alert(`Stock insuficiente. Apenas ${stockAvailable} unidades disponíveis.`)
        return
      }

      // Calcular diferença e ajustar stock
      const diff = newQuantity - currentQuantity

      if (diff > 0) {
        productsStore.decrementStock(id, diff)
      } else if (diff < 0) {
        productsStore.incrementStock(id, Math.abs(diff))
      }

      cartItem.quantity = newQuantity
    },

    // Incrementa quantity em 1 (validação: stock disponível)
    incrementItemQuantity(id) {
      const productsStore = useProductsStore()
      const cartItem = this.cartItems.find((item) => item.id === id)
      const product = productsStore.getProductById(id)

      if (!cartItem || !product) return

      if (product.stock < 1) {
        alert('Stock insuficiente.')
        return
      }

      cartItem.quantity++
      productsStore.decrementStock(id, 1)
    },

    // Decrementa quantity em 1 (mínimo 1, botão desativa em quantity = 1)
    decrementItemQuantity(id) {
      const productsStore = useProductsStore()
      const cartItem = this.cartItems.find((item) => item.id === id)

      if (!cartItem) return

      if (cartItem.quantity > 1) {
        cartItem.quantity--
        productsStore.incrementStock(id, 1)
      }
    },

    // Aplica código de desconto (SAVE10 = 10%, SAVE20 = 20%)
    applyDiscountCode(code) {
      const validCodes = {
        SAVE10: 10,
        SAVE20: 20,
      }

      const upperCode = code.toUpperCase()

      if (validCodes[upperCode]) {
        this.discountCode = upperCode
        this.discountPercentage = validCodes[upperCode]
      } else {
        alert('Código de desconto inválido.')
        this.discountCode = ''
        this.discountPercentage = 0
      }
    },

    // Remove desconto aplicado
    removeDiscountCode() {
      this.discountCode = ''
      this.discountPercentage = 0
    },

    // Limpa carrinho e devolve todo o stock aos produtos
    clearCart() {
      const productsStore = useProductsStore()

      this.cartItems.forEach((item) => {
        productsStore.incrementStock(item.id, item.quantity)
      })

      this.cartItems = []
      this.removeDiscountCode()
    },
  },

  // Persistir estado do carrinho em localStorage
  persist: {
    storage: localStorage,
  },
})
