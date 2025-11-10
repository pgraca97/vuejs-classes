import { products as initialProducts } from '@/data/shophub-data.js'

const CART_KEY = 'shophub-cart'
const PRODUCTS_KEY = 'shophub-products'

// Store de carrinho de compras (sem Pinia)
// Gere produtos e carrinho através do localStorage
export const cartStore = {
  // Inicializa produtos no localStorage na primeira utilização
  initializeProducts() {
    const stored = localStorage.getItem(PRODUCTS_KEY)
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts))
    }
  },

  // Obtém lista completa de produtos do localStorage (não do ficheiro)
  // Importante: stock é sempre atualizado no localStorage
  getProducts() {
    this.initializeProducts()
    const stored = localStorage.getItem(PRODUCTS_KEY)
    return JSON.parse(stored)
  },

  // Obtém produto específico pelo ID
  getProduct(productId) {
    const products = this.getProducts()
    return products.find((p) => p.id === Number(productId))
  },

  // Adiciona item ao carrinho e decrementa stock
  addItem(product, quantity = 1) {
    const cart = this.getItems()

    // Valida stock disponível antes de adicionar
    const realProduct = this.getProduct(product.id)
    if (!realProduct || realProduct.stock < quantity) {
      throw new Error('Stock insuficiente!')
    }

    // Verifica se produto já existe no carrinho
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    }

    // Atualiza stock e guarda carrinho
    this.decreaseStock(product.id, quantity)
    this.saveCart(cart)

    return cart
  },

  // Decrementa stock de um produto
  decreaseStock(productId, quantity) {
    const products = this.getProducts()
    const product = products.find((p) => p.id === productId)

    if (product) {
      product.stock -= quantity
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    }
  },

  // Incrementa stock (quando item é removido do carrinho)
  increaseStock(productId, quantity) {
    const products = this.getProducts()
    const product = products.find((p) => p.id === productId)

    if (product) {
      product.stock += quantity
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    }
  },

  // Remove item do carrinho e repõe stock
  removeItem(productId) {
    let cart = this.getItems()
    const item = cart.find((i) => i.id === productId)

    if (item) {
      this.increaseStock(productId, item.quantity)
    }

    cart = cart.filter((item) => item.id !== productId)
    this.saveCart(cart)
    return cart
  },

  // Obtém todos os itens do carrinho
  getItems() {
    const cart = localStorage.getItem(CART_KEY)
    return cart ? JSON.parse(cart) : []
  },

  // Atualiza quantidade de um item no carrinho e ajusta stock
  updateQuantity(productId, newQuantity) {
    const items = this.getItems()
    const item = items.find((item) => item.id === productId)

    if (item) {
      const difference = newQuantity - item.quantity

      // Aumentar quantidade: decrementa stock
      if (difference > 0) {
        this.decreaseStock(productId, difference)
      }
      // Diminuir quantidade: incrementa stock
      else if (difference < 0) {
        this.increaseStock(productId, Math.abs(difference))
      }

      item.quantity = newQuantity
      this.saveCart(items)
    }

    return items
  },

  // Limpa carrinho completamente (utilizado após checkout)
  clearCart() {
    localStorage.removeItem(CART_KEY)
  },

  // Calcula total de itens no carrinho (para cart-badge)
  getItemCount() {
    const items = this.getItems()
    return items.reduce((total, item) => total + item.quantity, 0)
  },

  // Calcula valor total do carrinho
  getTotal() {
    const items = this.getItems()
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  // Persiste carrinho no localStorage
  saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  },
}
