import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    min: -10,
    max: 100,
    history: [],
  }),
  getters: {
    // Verifica se o contador atingiu o valor mínimo
    isMinReached: (state) => state.count <= state.min,

    // Verifica se o contador atingiu o valor máximo
    isMaxReached: (state) => state.count >= state.max,

    // Calcula a percentagem do progresso entre min e max (0-100%)
    // Aqui como o min é negativo, é necessário ajustar o cálculo p/ normalizar a escala
    progressPercentage: (state) => {
      const range = state.max - state.min
      const currentPosition = state.count - state.min
      return Math.round((currentPosition / range) * 100)
    },

    // Conta quantas operações foram realizadas
    historyCount: (state) => state.history.length,

    // Retorna as últimas 5 operações em ordem decrescente
    last5Entries: (state) => state.history.slice(-5).reverse(),
  },
  actions: {
    // Incrementa count em 1 (não ultrapassa max)
    increment() {
      if (!this.isMaxReached) {
        this.count++
        this.addToHistory('increment', this.count)
      }
    },

    // Incrementa por valor específico com validação de limites
    incrementByAmount(amount) {
      // Poderiam fazer validação adicional aqui se necessário
      const newValue = this.count + Number(amount)

      if (newValue <= this.max) {
        this.count = newValue
        this.addToHistory(`incrementByAmount(${amount})`, this.count)
      } else {
        // Se ultrapassar, ajusta para o máximo permitido
        const actualIncrement = this.max - this.count
        this.count = this.max
        this.addToHistory(`incrementByAmount(${actualIncrement})`, this.count)
      }
    },

    // Decrementa count em 1 (não vai abaixo de min)
    decrement() {
      if (!this.isMinReached) {
        this.count--
        this.addToHistory('decrement', this.count)
      }
    },

    // Dá reset ao state para os valores iniciais
    reset() {
      this.$reset()
      this.addToHistory('reset', this.count)
    },

    // Adiciona registo ao histórico de operações
    addToHistory(operation, value) {
      this.history.push({
        operation,
        value,
        timestamp: Date.now(),
      })
    },
  },
})
