# Product Card - Props Reativas e Eventos Customizados

Segundo exercício da **Worksheet 03** para explorar reatividade de props, eventos customizados e comunicação bidirecional entre componentes.

## Objetivo

Criar um sistema de produtos com comunicação completa pai-filho: o pai passa dados via props, o filho notifica o pai de ações via evento, e ambos reagem a mudanças de estado automaticamente.

## Setup

```bash
npm create vue@latest
# Nome: student-card
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

cd student-card
npm install
npm run dev
```

## Estrutura do Código

- [`App.vue`](src/App.vue) - Componente root (importa ProductList)
- [`ProductList.vue`](src/components/ProductList.vue) - Lista de produtos que gere estado e eventos
- [`ProductCard.vue`](src/components/ProductCard.vue) - Card individual que recebe produto e emite eventos


## Conceitos

### Props do Tipo Object

Quando um componente precisa de **múltiplas propriedades relacionadas**, passar um objeto pode ser mais prático que props individuais.

**Comparação:**

```vue
<!-- ❌ Muitas props individuais (verboso mas explícito) -->
<ProductCard
  :name="product.name"
  :price="product.price"
  :image="product.image"
  :in-stock="product.inStock"
/>

<!-- ✅ Object prop (conciso) -->
<ProductCard :product="product" />
```

**Quando utilizar cada abordagem:**

- **Props individuais**: Dados simples, interface explícita, poucos campos
- **Object prop**: Dados complexos, muitos campos relacionados, objetos do domínio (Product, User, etc.)

**Validação de object prop:**

```javascript
props: {
  product: {
    type: Object,
    required: true,
    validator(value) {
      // Verifica se o objeto tem as propriedades necessárias
      return value.name && 
             typeof value.price === 'number' && 
             value.image && 
             typeof value.inStock === 'boolean'
    }
  }
}
```

> **Boa prática:** Sempre validar structure de objects recebidos - previne erros se o pai passar dados incompletos.

---

### Formatação de Valores com Intl.NumberFormat

Para formatar preços de forma profissional, utilizamos a **API nativa `Intl.NumberFormat`** dentro de uma computed property.

> **Nota:** Para compreender diferenças entre computed properties e methods (cache, performance, etc.), consultar [Worksheet 01 - Exercício 2](../../worksheet-01/README.md#exercício-2---computed-properties-vs-methods).

**Implementação:**

```javascript
computed: {
  formattedPrice() {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',       // Formata como moeda
      currency: 'EUR',          // Moeda em euros
      minimumFractionDigits: 2, // Mostra sempre 2 casas decimais
    }).format(this.product.price)
  }
}
```

**No template:**

```vue
<p class="price">{{ formattedPrice }}</p>
<!-- Input: 59.9 → Output: "59,90 €" -->
```

**Porquê Intl.NumberFormat?**

- **Internacionalização**: Adapta formato à localização (pt-PT utiliza vírgula, en-US utiliza ponto)
- **Consistência**: Mostra sempre 2 casas decimais (59,90 € não 59,9 €)
- **Nativo**: Sem dependências externas
- **Performance**: Criar uma instância fora do computed seria mais eficiente em listas grandes

**Outras opções de formatação:**

```javascript
// Percentagens
new Intl.NumberFormat('pt-PT', { style: 'percent' }).format(0.15) // "15%"

// Números com separadores
new Intl.NumberFormat('pt-PT').format(1234567) // "1 234 567"

// Moedas diferentes
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(59.9) // "$59.90"
```

---

### Eventos Customizados ($emit)

Componentes filhos **não podem modificar props diretamente**. Para notificar o pai de ações, utilizam **eventos customizados**.

**Declaração de eventos (boa prática):**

```javascript
export default {
  name: 'ProductCard',
  props: { /* ... */ },
  // Declara explicitamente os eventos que este componente emite
  emits: ['add-to-cart'],
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product.id)
    }
  }
}
```

**Porquê declarar em `emits`?**

- **Documentação**: Torna explícito quais eventos o componente emite
- **Validação**: Vue avisa se emitir eventos não declarados
- **Autocomplete**: IDEs e ferramentas conseguem sugerir eventos disponíveis
- **Manutenção**: Facilita encontrar todos os eventos de um componente

**Validação de eventos:**

```javascript
emits: {
  // Evento sem validação (só declaração)
  'add-to-cart': null,
  
  // Evento com validação
  'submit': (payload) => {
    if (!payload.email) {
      console.warn('Email é obrigatório no evento submit')
      return false
    }
    return true
  }
}
```

**Sintaxe no filho:**

```javascript
methods: {
  addToCart() {
    // this.$emit('nome-evento', payload)
    this.$emit('add-to-cart', this.product.id)
  }
}
```

**Sintaxe no pai:**

```vue
<ProductCard 
  :product="product"
  @add-to-cart="handleAddToCart"
/>
```

```javascript
methods: {
  handleAddToCart(productId) {
    // Recebe productId como argumento
    console.log('Produto adicionado:', productId)
  }
}
```

**Naming conventions:**

- **kebab-case** no template: `@add-to-cart`
- **camelCase** ou **kebab-case** no JavaScript: `'addToCart'` ou `'add-to-cart'`
- Vue converte automaticamente

**Fluxo de dados:**

```
┌──────────────┐
│ ProductList  │ ← Estado (products array)
└──────┬───────┘
       │ :product (props ↓)
       │ @add-to-cart (events ↑)
       ↓
┌──────────────┐
│ ProductCard  │ ← Apresentação e interação
└──────────────┘
```

> **Padrão unidirecional:** Props descem (pai → filho), eventos sobem (filho → pai). Nunca o contrário.

---

### Reatividade de Props

Quando o pai muda uma prop, **todos os filhos que a utilizam atualizam automaticamente**.

**Demonstração prática (toggleRandomStock):**

```javascript
// No ProductList
toggleRandomStock() {
  const randomIndex = Math.floor(Math.random() * this.products.length)
  // Mutação direta - Vue deteta e atualiza UI
  this.products[randomIndex].inStock = !this.products[randomIndex].inStock
}
```

**O que acontece:**

1. Método altera `products[2].inStock` de `true` para `false`
2. Vue deteta mudança (reatividade)
3. ProductCard que recebe `products[2]` re-renderiza
4. Badge muda de "Em Stock" para "Esgotado"
5. Botão desaparece (devido a `v-if="product.inStock"`)

**Tudo automático - sem manipulação manual do DOM!**

---

### Classes Dinâmicas com Objetos

Para aplicar classes condicionalmente, utilizamos **sintaxe de objeto** em `:class`:

```vue
<span
  class="badge"
  :class="{ 
    'in-stock': product.inStock, 
    'out-of-stock': !product.inStock 
  }"
>
  {{ product.inStock ? 'Em Stock' : 'Esgotado' }}
</span>
```

**Resultado:**
- `product.inStock === true` → `class="badge in-stock"`
- `product.inStock === false` → `class="badge out-of-stock"`

> **Nota:** Para conceitos de classes dinâmicas (arrays, operador ternário, etc.), consultar [Worksheet 01 - Ex4](../../worksheet-01/README.md#exercício-4---diretivas-e-aplicação-completa) e [Worksheet 02 - Watch Vault](../../worksheet-02/watchlist-app/README.md#1-rating-interativo-com-estrelas).


## Demonstração Prática

**Testa a reatividade:**

1. Abre a consola do browser
2. Clica em "Alterar Stock Aleatório"
3. Observa um card a mudar instantaneamente:
   - Badge muda cor e texto
   - Botão aparece/desaparece
4. Clica em "Adicionar ao Carrinho" num produto em stock
5. Observa:
   - Badge muda para "Esgotado"
   - Botão desaparece
   - Alert mostra nome do produto

**O que está a acontecer:**

```
Clique no botão "Adicionar"
  ↓
ProductCard.addToCart() executa
  ↓
$emit('add-to-cart', productId)
  ↓
ProductList.handleAddToCart(productId) recebe evento
  ↓
Altera product.inStock = false
  ↓
Vue deteta mudança (reatividade)
  ↓
ProductCard re-renderiza automaticamente
  ↓
UI atualiza (badge + botão)
```

## Boas Práticas

**Props:**
- Utilizar object props para entidades complexas do domínio
- Sempre validar structure de objects
- Nunca mutar props no componente filho

**Eventos:**
- Naming descritivo: `add-to-cart`, `item-clicked`, `form-submitted`
- Passar apenas dados necessários no payload
- Kebab-case no template

**Computed:**
- Utilizar para formatações e valores derivados
- Manter funções puras (sem side effects)
- Não utilizar para operações assíncronas

**Reatividade:**
- Confiar no sistema reativo do Vue
- Não manipular DOM diretamente
- Mutações diretas em arrays/objects funcionam 


## Recursos Úteis

- [Vue.js - Props](https://vuejs.org/guide/components/props.html)
- [Vue.js - Component Events](https://vuejs.org/guide/components/events.html)
- [Vue.js - Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Vue.js - Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html)
- [MDN - Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)