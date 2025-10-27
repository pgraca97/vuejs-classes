# Watch Vault - Gestão de Watchlist com Persistência

Aplicação desenvolvida nas aulas práticas da **Semana 3** para consolidar conceitos de formulários, validação, computed properties, watchers e persistência de dados com localStorage.

## Objetivo

Criar uma aplicação simples de gestão de watchlist (séries e filmes) com:

- Formulário completo com validações
- Sistema de rating interativo (estrelas)
- Ordenação dinâmica
- Contadores automáticos
- Persistência de dados com localStorage

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

- [`App.vue`](src/App.vue) - Componente root (importa WatchVault)
- [`WatchVault.vue`](src/components/WatchVault.vue) - Componente principal com toda a lógica

## Requisitos do Exercício

### 1. Estrutura de Dados

**Estado da aplicação:**

```javascript
data() {
  return {
    items: [],           // Lista de séries/filmes
    form: {              // Dados do formulário
      type: 'Series',
      name: '',
      category: 'Action',
      rating: 0
    },
    sortBy: '',          // Critério de ordenação
    sortOrder: 'asc',    // Ordem: ascendente/descendente
    hoverRating: 0,      // Preview visual das estrelas
    STORAGE_KEY: 'watchlist_items'
  }
}
```

**Conceitos:**

- Separação entre `items` (dados persistentes) e `form` (dados temporários)
- `hoverRating` para melhorar UX (preview antes de selecionar)
- Constante `STORAGE_KEY` para evitar typos

---

### 2. Formulário de Adição

**Campos implementados:**

- **Type** → Radio buttons (`Series` | `Movie`) - Obrigatório
- **Name** → Input texto - Obrigatório, mínimo 3 caracteres
- **Category** → Radio buttons (6 opções) - Obrigatório
- **Rating** → 10 estrelas interativas (0-10)

**Conceitos:**

- `v-model` em radio buttons: `v-model="form.type" :value="type"`
- `v-for` para gerar opções dinamicamente a partir de arrays
- Atributos HTML5 de validação: `required`, `minlength`
- Rating interativo com `@click`, `@mouseenter`, `@mouseleave`

**Demonstração prática (Rating):**

1. Passa o rato sobre as estrelas → vê preview visual
2. Clica numa estrela → fixa o rating
3. Rating atual mostrado abaixo: `{{ hoverRating || form.rating }}/10`

> A expressão `hoverRating || form.rating` mostra **preview** (se rato sobre estrelas) ou **valor selecionado** (se não).
>
> **Como funciona:** O operador `||` (OR lógico) retorna o **primeiro valor truthy**. Quando sais com o rato (`@mouseleave`), `hoverRating` é resetado para `0` (falsy), então o `||` passa para `form.rating`.

---

### 3. Validações

**Implementadas no método `addToWatchlist()`:**

```javascript
// 1. Nome mínimo 3 caracteres
if (this.form.name.length < 3) {
  alert('Name must have at least 3 characters')
  return
}

// 2. Verificar duplicados (mesmo nome + tipo)
const duplicate = this.items.find(
  (item) =>
    item.name.toLowerCase() === this.form.name.toLowerCase() && item.type === this.form.type,
)

// 3. Rating entre 0 e 10
if (this.form.rating < 0 || this.form.rating > 10) {
  alert('Rating must be between 0 and 10')
  return
}
```

**Boas práticas:**

- Validação no método (JavaScript) **e** atributos HTML5 (`required`, `minlength`)
- `.toLowerCase()` para comparação case-insensitive
- `.trim()` para remover espaços extras ao guardar
- `return` após validação falhar (early return pattern)

> **Nota:** As validações implementadas são exemplos. Na prática, dependem sempre da lógica de negócio de cada aplicação.

---

### 4. Botões e Ações

**Botão "Add to Watchlist":**

- Type: `submit` (aproveita validação nativa do browser)
- `@submit.prevent` no form para evitar reload da página
- Cria item com `id: self.crypto.randomUUID()` (ID único garantido)

**Botão "Clear Form":**

- Type: `button` (não é submit)
- Repõe `form` aos valores iniciais
- Limpa `hoverRating` (preview das estrelas)

**Botão "Remove":**

- `confirm()` nativo do browser para confirmação
- Remove item com `splice()` após encontrar índice com `findIndex()`

> **Melhoria possível:** Em aplicações reais, substituir `confirm()` por um modal customizado para melhor UX.

---

### 5. Lista e Tabela

**Estrutura:**

```vue
<tbody>
  <tr v-for="item in sortedItems" :key="item.id">
    <!-- Colunas: Type, Name, Category, Rating, Actions -->
  </tr>
</tbody>
```

**Conceitos:**

- `:key="item.id"` com UUID único (não índices)
- Itera sobre `sortedItems` (computed) em vez de `items` direto
- `v-if` / `v-else` para alternar entre tabela e mensagem vazia

---

### 6. Ordenação Dinâmica

**Implementação com Computed Property:**

```javascript
computed: {
  sortedItems() {
    if (!this.sortBy) return this.items // Sem ordenação

    // toSorted() cria NOVA cópia (imutável)
    return this.items.toSorted((a, b) => {
      // Lógica de comparação...
    })
  }
}
```

**Métodos de comparação:**

- **Alfabética:** `localeCompare()` - respeita acentos e caracteres especiais
- **Numérica:** Subtração (`a - b`) - negativo/0/positivo

**Conceitos importantes:**

- **`toSorted()` vs `sort()`:**
  - `toSorted()` → Cria nova cópia (imutável) ✅
  - `sort()` → Modifica array original (pode causar problemas com Vue)

- **Função de comparação:**
  - Retorna **negativo** → `a` vem antes de `b`
  - Retorna **0** → ordem mantida
  - Retorna **positivo** → `b` vem antes de `a`

**UI:**

- Select para escolher critério (`name` | `rating`)
- Botão para alternar ordem (↑ Ascending | ↓ Descending)
- Botão desabilitado (`:disabled="!sortBy"`) se sem critério

---

### 7. Contadores Automáticos

**Computed Properties para contadores:**

```javascript
computed: {
  seriesCount() {
    return this.items.filter(item => item.type === 'Series').length
  },
  moviesCount() {
    return this.items.filter(item => item.type === 'Movie').length
  }
}
```

**Porquê computed?**

- ✅ Atualização automática quando `items` muda
- ✅ Cache (só recalcula se `items` mudar)
- ✅ Código limpo no template

**Display:**

```vue
Total: {{ items.length }} items ({{ seriesCount }} series, {{ moviesCount }} movies)
```

---

### 8. Persistência com localStorage

**Salva automaticamente com Watcher:**

```javascript
watch: {
  items: {
    handler() {
      this.saveToLocalStorage()
    },
    deep: true  // ⚠️ Importante: detecta mudanças dentro de objetos
  }
}
```

**Carregamento no mounted:**

```javascript
mounted() {
  this.loadFromLocalStorage()
}
```

**Tratamento de erros:**

```javascript
saveToLocalStorage() {
  try {
    const jsonData = JSON.stringify(this.items)
    localStorage.setItem(this.STORAGE_KEY, jsonData)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}
```

**Conceitos importantes:**

- **Watcher com `deep: true`** → Observa mudanças dentro de arrays/objetos nested
- **Try-catch** → Prevenir erros (quota excedida, private browsing, etc.)
- **Validação ao carregar:** `Array.isArray()` antes de atribuir
- **Fallback:** Array vazio se dados corrompidos

---

## Destaques de Implementação

### 1. Rating Interativo com Estrelas

**Lógica de classes dinâmicas:**

```vue
:class="['star', { filled: star <= (hoverRating || form.rating) }]"
```

- Array com classe base `'star'` sempre presente
- Objeto para classe condicional: `filled` aplicada se condição true
- Condição: estrela atual ≤ preview **ou** rating selecionado

> **Quando utilizar computed?** Se a lógica de classes ficasse mais complexa (múltiplas condições, cálculos), seria melhor extrair para uma computed property.

**Events:**

- `@click="form.rating = star"` → Fixa o rating
- `@mouseenter="hoverRating = star"` → Preview visual
- `@mouseleave="hoverRating = 0"` → Limpa preview (no container)

---

### 2. Imutabilidade com toSorted()

```javascript
// ✅ Recomendado: toSorted() (ES2023)
return this.items.toSorted((a, b) => {
  /* ... */
})

// ❌ Evitar: sort() (muta o original)
return this.items.sort((a, b) => {
  /* ... */
})
```

**Porquê imutabilidade?**

- Vue detecta melhor mudanças em arrays
- Evita side effects inesperados
- Código mais previsível e testável

> **Nota:** `toSorted()` é relativamente recente (ES2023). Se precisares de suporte em browsers antigos, utiliza `[...this.items].sort()` (spread cria cópia).

---

### 3. UUID vs Outros Métodos de ID

```javascript
id: self.crypto.randomUUID() // ✅ Recomendado
```

**Alternativas (NÃO recomendadas):**

```javascript
// ❌ Timestamp: pode ter colisões se adicionar 2 items rapidamente
id: Date.now()

// ❌ Contador: quebra se remover items
id: this.items.length + 1

// ❌ Índice do array: quebra na ordenação/remoção
:key="index"
```

**Vantagens do UUID:**

- Garantia de unicidade
- Funciona offline
- Suporte nativo moderno (`self.crypto.randomUUID()`)

---

## Recursos Úteis

- [Vue.js - Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)
- [Vue.js - Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Vue.js - Watchers](https://vuejs.org/guide/essentials/watchers.html)
- [Vue.js - List Rendering](https://vuejs.org/guide/essentials/list.html)
- [MDN - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN - Array.prototype.toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- [MDN - crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
