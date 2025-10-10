# Watchlist App - Primeiro Projeto Vue

Primeiro projeto hands-on: lista simples de filmes/séries para praticar conceitos básicos de Vue (o nosso "Hello World").

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
# ESLint: Yes (deteta erros e más práticas)
# Prettier: Yes (formata código automaticamente)
# Experimental features: No
# Blank project: Yes

cd watchlist-app
npm install
npm run dev
```

## Estrutura do Código

- `App.vue` - Componente principal com toda a lógica
- `main.js` - Ponto de entrada da aplicação
- `style.css` - Estilos globais

## Conceitos

- **data():** Estado reativo do componente
- **methods:** Funções que modificam o estado
- **Interpolação `{{ }}`:** Mostrar dados no template
- **v-model:** Two-way binding entre input e dados
- **@click / @keyup.enter:** Event handlers _(@ é shorthand de `v-on:`)_
- **v-for:** Renderizar listas dinamicamente
- **`:key` (v-bind:key):** Identificar elementos únicos em listas
  - **IDs únicos:** Essenciais para `:key` em elementos dinâmicos

> **Não esquecer:** Validar dados antes de processar. As validações dependem da lógica de negócio de cada aplicação.

### Interpolação

Inserir dados JavaScript no HTML de forma dinâmica utilizando a `{{ expressão }}`.

- Exemplo:

  ```vue
  <h1>{{ message }}</h1>
  <!-- Mostra valor de message -->
  ```

- Vue avalia a expressão e substitui pelo valor correspondente. Sempre que os dados mudam, o template atualiza automaticamente.

### IDs únicos e `:key`

O atributo `:key` precisa de um valor **único e estável** para cada item da lista.

> **Nota:** Existem casos onde utilizar o `index` como `:key` funciona (listas estáticas, sem reordenação, etc.). Contudo, é **melhor desde início** recorrer a IDs únicos em todas as situações - o impacto na performance é negligenciável e evita bugs futuros.

**Má prática:**

```vue
<li v-for="movie in movieArray" :key="movie">
  {{ movie }}
  <!-- Problema: se adicionar "Matrix" duas vezes, :key repete! -->
</li>
```

**Boa prática:**

```vue
<li v-for="movie in movieArray" :key="movie.id">
  {{ movie.name }}
  <!-- ID único garante que Vue identifica cada item corretamente -->
</li>
```

**Formas de gerar IDs únicos:**

1. **ID incremental** (simples e funcional):

   ```javascript
   data() {
     return {
       movieId: 1,
       movieArray: []
     }
   },
   methods: {
     addMovie() {
       const newMovie = {
         id: this.movieId++,  // 1, 2, 3, 4...
         name: this.movieInput
       }
       this.movieArray.push(newMovie)
     }
   }
   ```

2. **UUID com Web Crypto API** (mais robusto):
   ```javascript
   const newMovie = {
     id: self.crypto.randomUUID(), // "550e8400-e29b-41d4-a716-446655440000"
     name: this.movieInput,
   }
   ```

> **Nota:** Existem outras formas de gerar IDs únicos (timestamps, bibliotecas como `nanoid`, etc.). O importante é garantir unicidade e estabilidade.

**Recursos adicionais:**

- [Vue.js - Maintaining State with `key`](https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
- [Best Practices: Using `key` for Performance](https://www.beyondthesemicolon.com/vue-js-best-practices-using-key-for-optimal-performance-and-maintainability/)
