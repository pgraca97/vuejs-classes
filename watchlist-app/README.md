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
- **:key:** Identificar elementos únicos em listas

**Interpolação** = inserir dados JavaScript no HTML de forma dinâmica utilizando a `{{ expressão }}`.

- Exemplo:

  ```vue
  <h1>{{ message }}</h1>   <!-- Mostra valor de message -->
  ```

- Vue avalia a expressão e substitui pelo valor correspondente. Sempre que os dados mudam, o template atualiza automaticamente.
