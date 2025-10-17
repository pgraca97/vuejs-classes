# Counter App - Componente Interativo com Validação

Aplicação de contador simples desenvolvida nas aulas práticas da **Semana 3** para consolidar conceitos de event handling, validação de dados, lifecycle hooks e interação com teclado.

## Objetivo

Criar um componente contador com múltiplas funcionalidades:

- Incremento/decremento com validação
- Botões de incremento personalizado
- Atalhos de teclado globais
- Mensagem de erro temporária

## Setup

```bash
npm create vue@latest
# Nome: counter-app
# TypeScript: No
# JSX: No
# Router: No
# Pinia: No
# Vitest: No
# E2E: No
# ESLint: Yes
# Prettier: Yes
# Experimental features: No
# Blank project: Yes

cd counter-app
npm install
npm run dev
```

## Estrutura do Código

- [`App.vue`](src/App.vue) - Componente root (importa Counter)
- [`Counter.vue`](src/components/Counter.vue) - Componente principal com toda a lógica

## Requisitos do Exercício

### 1. Contador Simples

**Funcionalidades básicas:**

- Número no ecrã (começa em 0)
- Botão **"+"** → aumenta 1 unidade
- Botão **"-"** → diminui 1 unidade
- Botão **"Reset"** → volta a 0

**Conceitos:**

- `data()` - Estado reativo
- `methods` - Funções para manipular estado
- Event binding com `@click`

---

### 2. Incremento Personalizado

**Funcionalidades:**

- Botão **"+5"** → adiciona 5
- Botão **"+10"** → adiciona 10
- Botão **"+50"** → adiciona 50

**Conceito-chave:** Reutilização de código

- **Um único método** `increment(value)` com parâmetro opcional
- Chamado de formas diferentes: `@click="increment()"` vs `@click="increment(5)"`
- Valor default (`value = 1`) permite chamadas sem argumento

```javascript
// ✅ Boa prática: método reutilizável
increment(value = 1) {
  this.count += value
}

// ❌ Evitar: criar métodos separados para cada valor
incrementFive() { this.count += 5 }
incrementTen() { this.count += 10 }
```

---

### 3. Atalhos de Teclado

**Funcionalidades:**

- Tecla **[+]** ou **[=]** → incrementa 1
- Tecla **[-]** → decrementa 1
- Tecla **[R]** → reset

**Conceitos:**

- `window.addEventListener()` - Event listener global
- `mounted()` - Lifecycle hook para registar listener
- `beforeUnmount()` - **CRÍTICO** para limpar listener (evitar memory leaks)

**Demonstração prática:**

1. Abre a aplicação
2. Pressiona as teclas `+`, `-` ou `R`
3. O contador reage globalmente (não precisa de focus no elemento)

> **Nota:** Se não remover o event listener em `beforeUnmount()`, o listener fica ativo mesmo depois do componente ser destruído, o que **pode causar memory leaks** (o componente não é libertado da memória) e comportamentos inesperados (código a executar em componentes que já não existem visualmente).

---

### 4. Validação de Dados

**Regra de negócio:** O contador **nunca pode ser negativo**

**Comportamento:**

- Se `count > 0` → decrementa normalmente
- Se `count === 0` → mantém em 0 e mostra mensagem informativa
- Mensagem desaparece automaticamente após 3 segundos

**Conceitos:**

- Validação dentro do método `decrement()`
- `setTimeout()` para ações agendadas
- `clearTimeout()` para cancelar timeouts pendentes
- `v-if` para renderização condicional da mensagem

## Destaques de Implementação

### 1. Gestão de Timeouts

```javascript
showError(message) {
  this.clearError() // Cancelar timeout anterior
  this.errorMessage = message

  this.errorTimeout = setTimeout(() => {
    this.errorMessage = ''
    this.errorTimeout = null // Limpar referência após execução
  }, 3000)
}

clearError() {
  if (this.errorTimeout) {
    clearTimeout(this.errorTimeout) // ⚠️ Importante: cancelar timeout
    this.errorTimeout = null
  }
  this.errorMessage = ''
}
```

**Porquê cancelar timeouts e limpar referências?**

- Evitar mensagens sobrepostas (se clicar várias vezes rapidamente)
- Libertar recursos quando o componente é destruído
- Prevenir updates em componentes desmontados (erros em runtime)
- `errorTimeout = null` permite verificar se há timeout ativo com `if (this.errorTimeout)`

---

### 2. Event Listeners Globais

```javascript
mounted() {
  window.addEventListener('keydown', this.handleKeyPress)
}

beforeUnmount() {
  window.removeEventListener('keydown', this.handleKeyPress) // ⚠️ CRÍTICO

  if (this.errorTimeout) {
    clearTimeout(this.errorTimeout)
  }
}
```

**Boas práticas:**

- Sempre limpar event listeners globais em `beforeUnmount()`
- Sempre cancelar timeouts/intervals pendentes
- Evitar referencias a `this` após componente ser destruído

---

### 3. Parâmetros Opcionais com Default Values

```javascript
increment(value = 1) {
  this.count += value
}
```

**Permite chamadas flexíveis:**

```vue
<button @click="increment()">+1</button>
<!-- utiliza default = 1 -->
<button @click="increment(5)">+5</button>
<!-- passa 5 -->
<button @click="increment(10)">+10</button>
<!-- passa 10 -->
```

> **Cuidado:** Não confundir `@click="increment()"` com `@click="increment"`
> 
> - `@click="increment()"` → Chama o método **sem argumentos**, utilizar default `value = 1` 
> - `@click="increment"` → Vue passa o **evento** como argumento, resultando em `value = [object PointerEvent]`
> 
> **Regra prática:** Se o método recebe parâmetros ou tem defaults, utilizar sempre `()` para ser explícito.

## Alternativas (Opcional)

Existem várias formas de implementar o `handleKeyPress()`. Aqui estão duas alternativas à solução com `if/else` apresentada no exercício:

### 1. Switch Case

Versão com `switch/case`:

```javascript
handleKeyPress(event) {
  switch (event.key) {
    case '+':
    case '=':
      this.increment()
      break
    case '-':
      this.decrement()
      break
    case 'r':
    case 'R':
      this.reset()
      break
  }
}
```

**Comparação com `if/else`:**

- **Legibilidade:** Mais clara quando há múltiplas condições
- **Performance:** Praticamente idêntica (JavaScript otimiza ambos)
- **Manutenção:** Mais fácil adicionar novos casos
- **Desvantagem:** Requer `break` em cada caso (esquecimento = bugs)

---

### 2. Object Mapping

Versão com mapeamento de objetos:

```javascript
handleKeyPress(event) {
  const keyActions = {
    '+': () => this.increment(),
    '=': () => this.increment(),
    '-': () => this.decrement(),
    'r': () => this.reset(),
    'R': () => this.reset(),
  }

  const action = keyActions[event.key]
  if (action) action()
}
```

**Vantagens:**

- Mais escalável (fácil adicionar novas teclas)
- Mais funcional (mapeia tecla → ação)
- Evita repetição de `if/else` ou `break`
- Ideal para lógica complexa de mapeamento

**Desvantagem:**

- Menos intuitivo para iniciantes
- Overhead de criar objeto a cada chamada (irrelevante na prática)

---

### Qual utilizar?

| Abordagem        | Ideal para                         | Complexidade |
| ---------------- | ---------------------------------- | ------------ |
| **if/else**      | Poucos casos simples (2-4 teclas)  | ⭐           |
| **switch/case**  | Vários casos (5-10 teclas)         | ⭐⭐         |
| **Object Mapping** | Muitos casos ou lógica complexa | ⭐⭐⭐       |

> **Dica:** Para este exercício, qualquer das três abordagens é válida. Escolhe a que te parece mais legível!

## Recursos Úteis

- [Vue.js - Event Handling](https://vuejs.org/guide/essentials/event-handling.html)
- [Vue.js - Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [MDN - addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN - setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [MDN - KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
