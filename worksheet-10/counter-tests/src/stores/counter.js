import { defineStore } from 'pinia'

/**
 * Store de contador simples
 */
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),

  getters: {
    /**
     * Retorna o dobro do valor atual
     */
    double: (state) => state.count * 2,

    /**
     * Verifica se o contador é positivo
     */
    isPositive: (state) => state.count > 0,
  },

  actions: {
    /**
     * Incrementa o contador em 1
     * Action mais simples possível - modifica diretamente o state
     */
    increment() {
      this.count++
    },

    /**
     * Decrementa o contador em 1
     * Permite valores negativos - não há validação propositadamente
     */
    decrement() {
      this.count--
    },

    /**
     * Reseta o state para o valor inicial
     */
    reset() {
      this.$reset()
    },
  },
})