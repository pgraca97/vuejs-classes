import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useCounterStore } from '@/stores/counter'

/**
 * Testes para useCounterStore
 *
 * IMPORTANTE: Stores Pinia precisam de uma instância ativa do Pinia
 * para funcionarem. Por isso usamos setActivePinia() antes de cada teste.
 */

describe('useCounterStore', () => {
  /**
   * beforeEach() corre antes de cada teste individual
   *
   * Aqui criamos uma nova instância limpa do Pinia para cada teste.
   * Isto garante que os testes são independentes - um teste não
   * afeta o resultado de outro.
   */
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with count = 0', () => {
      // Criar a store
      const store = useCounterStore()

      // Verificar que o state inicial está correto
      expect(store.count).toBe(0)
    })
  })

  describe('actions', () => {
    describe('increment', () => {
      it('should increase count by 1', () => {
        const store = useCounterStore()

        // State inicial
        expect(store.count).toBe(0)

        // Executar a action
        store.increment()

        // Verificar que o state mudou
        expect(store.count).toBe(1)
      })

      it('should work multiple times', () => {
        const store = useCounterStore()

        store.increment()
        store.increment()
        store.increment()

        expect(store.count).toBe(3)
      })
    })

    describe('decrement', () => {
      it('should decrease count by 1', () => {
        const store = useCounterStore()

        // Partir de 0, decrementar vai para -1
        store.decrement()

        expect(store.count).toBe(-1)
      })

      it('should allow negative numbers', () => {
        const store = useCounterStore()

        store.decrement()
        store.decrement()
        store.decrement()

        expect(store.count).toBe(-3)
      })

      it('should work after incrementing', () => {
        const store = useCounterStore()

        store.increment() // count = 1
        store.increment() // count = 2
        store.decrement() // count = 1

        expect(store.count).toBe(1)
      })
    })

    describe('reset', () => {
      it('should reset count to 0', () => {
        const store = useCounterStore()

        // Modificar o state
        store.increment()
        store.increment()
        store.increment()
        expect(store.count).toBe(3)

        // Executar reset
        store.reset()

        // Verificar que voltou a 0
        expect(store.count).toBe(0)
      })

      it('should reset from negative values', () => {
        const store = useCounterStore()

        store.decrement()
        store.decrement()
        expect(store.count).toBe(-2)

        store.reset()

        expect(store.count).toBe(0)
      })
    })
  })

  describe('getters', () => {
    describe('double', () => {
      it('should return double the count value', () => {
        const store = useCounterStore()

        // Testar com count = 0
        expect(store.double).toBe(0)

        // Testar com count = 5
        store.count = 5
        expect(store.double).toBe(10)
      })

      it('should work with negative numbers', () => {
        const store = useCounterStore()

        store.count = -3
        expect(store.double).toBe(-6)
      })

      it('should be reactive to state changes', () => {
        const store = useCounterStore()

        // Getter inicial
        expect(store.double).toBe(0)

        // Modificar state através de action
        store.increment()

        // Getter deve atualizar automaticamente (reatividade)
        expect(store.double).toBe(2)
      })
    })

    describe('isPositive', () => {
      it('should return false when count is 0', () => {
        const store = useCounterStore()

        expect(store.isPositive).toBe(false)
      })

      it('should return true when count is greater than 0', () => {
        const store = useCounterStore()

        store.increment()

        expect(store.isPositive).toBe(true)
      })

      it('should return false when count is less than 0', () => {
        const store = useCounterStore()

        store.decrement()

        expect(store.isPositive).toBe(false)
      })

      it('should update reactively', () => {
        const store = useCounterStore()

        // Começa false (count = 0)
        expect(store.isPositive).toBe(false)

        // Incrementar torna true
        store.increment()
        expect(store.isPositive).toBe(true)

        // Decrementar duas vezes torna false
        store.decrement()
        store.decrement()
        expect(store.isPositive).toBe(false)
      })
    })
  })

  // Teste de integração entre state, actions e getters
  describe('integration', () => {
    it('should maintain consistency between state, actions and getters', () => {
      const store = useCounterStore()

      // Estado inicial
      expect(store.count).toBe(0)
      expect(store.double).toBe(0)
      expect(store.isPositive).toBe(false)

      // Incrementar 3 vezes
      store.increment()
      store.increment()
      store.increment()

      expect(store.count).toBe(3)
      expect(store.double).toBe(6)
      expect(store.isPositive).toBe(true)

      // Decrementar 5 vezes
      store.decrement()
      store.decrement()
      store.decrement()
      store.decrement()
      store.decrement()

      expect(store.count).toBe(-2)
      expect(store.double).toBe(-4)
      expect(store.isPositive).toBe(false)

      // Reset
      store.reset()

      expect(store.count).toBe(0)
      expect(store.double).toBe(0)
      expect(store.isPositive).toBe(false)
    })
  })
})
