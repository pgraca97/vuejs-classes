# Task Manager - Estado Centralizado com Múltiplos Componentes

Quarto exercício da **Worksheet 03** para explorar **arquitetura de componentes** com estado centralizado, onde um componente pai orquestra múltiplos filhos de tipos diferentes.

## Objetivo

Criar um gestor de tarefas que demonstra como **centralizar estado e lógica** num componente pai que coordena múltiplos filhos: um para input (TaskInput) e múltiplos para apresentação (TaskItem).

## Setup

```bash
npm create vue@latest
# Nome: watchlist-app
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

cd watchlist-app
npm install
npm run dev
```

## Estrutura do Código

- [`App.vue`](src/App.vue) - Componente root (apenas importa TaskManager)
- [`TaskManager.vue`](src/components/TaskManager.vue) - **Hub central**: gere estado, localStorage e orquestra TaskInput/TaskItem
- [`TaskInput.vue`](src/components/TaskInput.vue) - Input para adicionar novas tarefas
- [`TaskItem.vue`](src/components/TaskItem.vue) - Card individual de tarefa com checkbox e botão remover


## Conceitos

### Estado Centralizado (Single Source of Truth)

**Arquitetura do Task Manager:**

```
┌─────────────────┐
│  TaskManager    │ ← Estado central (tasks[])
│  (Pai)          │ ← Lógica de negócio (add, toggle, delete)
└────────┬────────┘ ← Persistência (localStorage)
         │
    ┌────┴────────────────┐
    │                     │
    ↓                     ↓
┌──────────┐      ┌──────────────┐
│TaskInput │      │ TaskItem (×N)│
│  (Filho) │      │  (Filhos)    │
└──────────┘      └──────────────┘
    │                     │
    │ @add-task           │ @toggle-task
    │                     │ @delete-task
    └─────────┬───────────┘
              ↓
       Eventos sobem
       Props descem
```

**Responsabilidades por camada:**

**TaskManager (Pai - Hub Central):**
- ✅ Mantém array de tarefas (`tasks[]`)
- ✅ Métodos que modificam estado (`addTask`, `toggleTask`, `deleteTask`)
- ✅ Computed properties derivadas (`totalTasks`, `completedTasks`)
- ✅ Persistência (localStorage)
- ✅ Orquestra comunicação entre filhos

**TaskInput (Filho):**
- ✅ Apresenta UI do input
- ✅ Valida input localmente
- ✅ Emite evento `@add-task` com descrição
- ❌ **Não** guarda tarefas
- ❌ **Não** acede a localStorage

**TaskItem (Filho):**
- ✅ Apresenta tarefa individual (props)
- ✅ Emite eventos `@toggle-task` e `@delete-task`
- ❌ **Não** modifica tarefa diretamente
- ❌ **Não** conhece outros TaskItems

**Porquê centralizar?**

1. **Single Source of Truth**: Uma única fonte de verdade para o estado
2. **Sincronização**: TaskInput adiciona → todos os TaskItem veem imediatamente
3. **Debugging**: Estado num só sítio facilita inspeção e correção
4. **Persistência**: Um ponto único para guardar/carregar (localStorage)
5. **Testabilidade**: Testar TaskManager testa toda a lógica de negócio

**Exemplo de fluxo:**

```
1. User escreve "Estudar Vue" e clica Enter
   ↓
2. TaskInput valida (não vazio) e emite:
   this.$emit('add-task', 'Estudar Vue')
   ↓
3. TaskManager recebe evento e executa:
   addTask(description) {
     const newTask = { id: uuid(), description, completed: false }
     this.tasks.push(newTask)
     this.saveTasks()  // Persiste localStorage
   }
   ↓
4. Vue deteta mudança em tasks[] (reatividade)
   ↓
5. Template re-renderiza:
   - v-for cria novo TaskItem
   - Contadores atualizam automaticamente
   - Novo item aparece na UI
```

**Quando utilizar estado centralizado:**

✅ **Utilizar quando:**
- Múltiplos componentes precisam de aceder/modificar os mesmos dados
- Existe lógica de negócio complexa (validação, cálculos, persistência)
- Dados precisam de sincronização entre componentes

❌ **Não utilizar quando:**
- Estado é puramente local a um componente (ex: `isHovered`, `showTooltip`)
- Componente não precisa de comunicar mudanças ao exterior

---

### Persistência com localStorage

Para guardar tarefas entre sessões, utilizamos localStorage. Conceito já explorado em [Worksheet 02 - Watch Vault](../../worksheet-02/watchlist-app/README.md#7-persistência-com-localstorage).

**Implementação neste exercício:**

```javascript
mounted() {
  // Carrega ao montar o componente
  const savedTasks = localStorage.getItem(this.STORAGE_KEY)
  if (savedTasks) {
    this.tasks = JSON.parse(savedTasks)
  }
},

methods: {
  saveTasks() {
    // Guarda após cada mutação
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks))
  }
}
```

## Demonstração Prática

**Testa o estado centralizado:**

1. Adiciona 2-3 tarefas novas
2. Marca algumas como completas
3. **Observa os contadores atualizarem automaticamente** (computed properties)
4. Remove uma tarefa
5. Refresca a página (F5)
6. **Tarefas permanecem** (localStorage)

**Para visualizar o fluxo:**

1. Abre Vue DevTools → Components
2. Seleciona TaskManager
3. Vê em `data`: array `tasks[]` 
4. Adiciona uma tarefa nova
5. Observa `tasks[]` atualizar em tempo real
6. Navega para TaskItem individual
7. Vê em `props`: objeto `task` que vem do pai


## Boas Práticas

**Arquitetura de Estado Centralizado:**
- Identificar o **ancestral comum** mais próximo de todos os componentes que precisam dos dados
- Manter estado e lógica de negócio **no pai**, não nos filhos
- Filhos apenas **apresentam e emitem eventos**, não modificam dados diretamente
- Um componente pai pode orquestrar **múltiplos tipos** de filhos diferentes

**Quando aplicar este padrão:**
- ✅ Múltiplos componentes precisam de partilhar/modificar os mesmos dados
- ✅ Existe lógica de negócio que afeta múltiplos componentes
- ✅ Dados precisam de persistência (localStorage, API, etc.)
- ❌ Estado é puramente local a um componente (hover, tooltips, etc.)

---

## Recursos Úteis

- [Vue.js - Component Events](https://vuejs.org/guide/components/events.html)
- [Vue.js - Thinking in Components](https://vuejs.org/guide/essentials/component-basics.html)
- [MDN - Web Storage API (localStorage)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)