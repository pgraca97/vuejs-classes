<script>
export default {
  name: 'CounterApp',

  data() {
    return {
      count: 0, // Valor atual do contador
      errorMessage: '', // Mensagem de erro a mostrar (vazio = sem erro)
      errorTimeout: null, // Referência ao timeout ativo (para poder limpar depois)
    }
  },

  methods: {
    // Aumenta o contador (recebe valor opcional, default = 1)
    // Permite reutilizar o mesmo método para incrementos diferentes
    increment(value = 1) {
      this.count += value
      this.clearError() // Limpar erro se existir
    },

    // Diminui o contador (valida se pode decrementar)
    decrement() {
      if (this.count > 0) {
        this.count--
        this.clearError()
      } else {
        // Contador já está em 0 → mostrar mensagem informativa
        this.showError('O contador não pode ser negativo!')
      }
    },

    // Repõe contador a 0
    reset() {
      this.count = 0
      this.clearError()
    },

    // Mostra mensagem de erro temporária (desaparece após 3 segundos)
    showError(message) {
      this.clearError() // Cancelar timeout anterior se existir
      this.errorMessage = message

      // Agendar limpeza automática da mensagem
      this.errorTimeout = setTimeout(() => {
        this.errorMessage = ''
        this.errorTimeout = null
      }, 3000)
    },

    // Limpa mensagem de erro e cancela timeout pendente
    clearError() {
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout) // Cancelar timeout agendado
        this.errorTimeout = null
      }
      this.errorMessage = ''
    },

    // Event handler para atalhos de teclado
    handleKeyPress(event) {
      if (event.key === '+' || event.key === '=') {
        this.increment()
      } else if (event.key === '-') {
        this.decrement()
      } else if (event.key.toLowerCase() === 'r') {
        this.reset()
      }
    },
  },

  // Lifecycle: componente foi montado no DOM
  mounted() {
    // Registar event listener global para teclas
    window.addEventListener('keydown', this.handleKeyPress)
  },

  // Lifecycle: componente vai ser desmontado
  beforeUnmount() {
    // Limpar event listener global (evitar memory leaks)
    window.removeEventListener('keydown', this.handleKeyPress)

    // Cancelar timeout pendente se existir (boa prática)
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout)
    }
  },
}
</script>

<template>
  <div class="counter-app">
    <h1>Counter Demo</h1>

    <!-- Display principal: botões -/+ e valor do contador -->
    <div class="counter-display">
      <!-- @click chama método increment sem argumentos (utiliza default = 1) -->
      <button @click="increment()">&#43;</button>
      <h2>{{ count }}</h2>
      <button @click="decrement">&#8722;</button>
    </div>

    <!-- v-if: só renderiza se houver mensagem de erro -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Botões de incremento personalizado -->
    <div class="button-group">
      <div class="buttons">
        <button @click="reset">Reset</button>
        <!-- Mesmo método increment, valores diferentes passados como argumento -->
        <button @click="increment(5)">+5</button>
        <button @click="increment(10)">+10</button>
        <button @click="increment(50)">+50</button>
      </div>
    </div>

    <!-- Informação sobre atalhos de teclado disponíveis -->
    <div class="keyboard-shortcuts">
      <h3>Atalhos de teclado</h3>
      <ul>
        <li><kbd>+</kbd> ou <kbd>=</kbd> → Incrementa 1</li>
        <li><kbd>-</kbd> → Decrementa 1</li>
        <li><kbd>R</kbd> → Reset</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.counter-app {
  display: grid;
  row-gap: 1px;
  width: 500px;
}

.counter-app > * {
  margin: 0;
}

h1,
p {
  line-height: 1;
}

p {
  font-style: italic;
}

.counter-display {
  display: flex;
  align-items: center;
  gap: 20px;
}

.counter-display h2 {
  font-size: 3em;
  margin: 0;
}

.error-message {
  font-style: italic;
  color: #ff4d4f;
  margin: 10px 0;
  opacity: 0.8;
}

.button-group {
  margin-top: 20px;
}

.button-group h3 {
  font-size: 1em;
  margin-bottom: 10px;
  font-weight: 500;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.counter-app button {
  background-color: #2f2f2f;
  transition:
    background-color 0.5s,
    transform 0.2s;
  padding: 5px 12px;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 8px;
  font-size: 0.9em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.87);
  cursor: pointer;
  line-height: 1.7;
  inline-size: fit-content;
}

.counter-app button:hover {
  background-color: rgba(84, 84, 84, 0.3);
  transform: translateY(-2px);
}

.counter-app button:active {
  transform: translateY(0px) scale(0.98);
  background-color: rgba(84, 84, 84, 0.25);
}

.keyboard-shortcuts {
  margin-top: 30px;
  border: 1px solid rgb(66, 184, 131);
  background-color: #2f2f2f;
  inline-size: 100%;
  border-radius: 8px;
  padding: 15px;
}

.keyboard-shortcuts h3 {
  font-size: 1em;
  margin: 0 0 10px 0;
  font-weight: 500;
}

.keyboard-shortcuts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.keyboard-shortcuts li {
  margin: 5px 0;
  font-size: 0.9em;
}

kbd {
  background-color: #2f2f2f;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.85em;
  font-weight: 600;
}
</style>
