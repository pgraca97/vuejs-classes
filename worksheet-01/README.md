# Worksheet 01 - Consolidação de Conceitos Base

Ficha de exercícios práticos para consolidar conceitos fundamentais de Vue.js trabalhados na **Semana 2**.

## Objetivo

Praticar de forma autónoma os conceitos introduzidos na aula teórica desta respetiva semana, criando componentes isolados para cada exercício.

## Setup

```bash
npm create vue@latest
# Nome: worksheet-01
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

cd worksheet-01
npm install
npm run dev
```

## Estrutura do Código

- [`App.vue`](src/App.vue) - Componente principal que importa todos os exercícios
- [`components/`](src/components/) - Pasta com os 4 exercícios (Ex1.vue a Ex4.vue)

## Exercícios

### Exercício 1 - Hello Vue!

**Objetivo:** Praticar interpolação básica.

**Conceitos:**

- `data()` - Estado reativo
- Interpolação `{{ }}` - Mostrar dados no template

**Ficheiro:** [`Ex1.vue`](src/components/Ex1.vue)

---

### Exercício 2 - Computed Properties vs Methods

**Objetivo:** Compreender a diferença entre computed properties (com cache) e methods (sem cache).

**Conceitos:**

- `computed` - Propriedades calculadas com cache (só recalcula se dependências mudarem)
- `methods` - Funções sem cache (executam sempre que chamadas)
- Event handling com `@click` _(@ é shorthand de v-on:)_
- Performance: computed é mais eficiente para valores derivados

**Ficheiro:** [`Ex2.vue`](src/components/Ex2.vue)

**Demonstração prática:**

1. **Ao carregar a página:** Abre a consola do browser
   - 🟢 `computed` executa **1x** (quando o componente é criado e o template renderiza)
   - 🔴 `method` executa **3x** (uma vez por cada chamada no template)

2. **Ao clicar no botão "Increase Age":**
   - 🟢 `computed` **NÃO executa** (cache mantém-se porque `firstName` e `lastName` não mudaram)
   - 🔴 `method` executa **3x novamente** (componente re-renderiza e chama a função 3x no template)

> Computed é mais eficiente porque só recalcula quando as suas **dependências** mudam (`firstName` ou `lastName`). Methods executam sempre que são chamados, independentemente se o resultado mudou ou não.

- **Computed:** Valores derivados de outros dados (ex: `fullName` a partir de `firstName` + `lastName`)
  - Não aceita argumentos (são propriedades, não funções)
- **Methods:** Ações/operações que precisam de argumentos ou não dependem só de dados (ex: fazer pedidos API, validações complexas, formatações com parâmetros, etc.)

---

### Exercício 3 - Lifecycle Hooks

**Objetivo:** Compreender o ciclo de vida de um componente Vue.

**Conceitos:**

- **Criação:** `beforeCreate` → `created`
- **Montagem:** `beforeMount` → `mounted` (componente adicionado ao DOM)
- **Atualização:** `beforeUpdate` → `updated` (quando dados mudam)
- **Desmontagem:** `beforeUnmount` → `unmounted` (componente removido do DOM)

**Ficheiro:** [`Ex3.vue`](src/components/Ex3.vue)

**Demonstração prática:**

1. **Ao carregar a página:** Abre a consola do browser
   - Verás os hooks de criação (`beforeCreate`, `created`) e montagem (`beforeMount`, `mounted`)

2. **Ao clicar em "Aumentar Peso":**
   - Verás `beforeUpdate` (dados mudaram, DOM ainda não atualizou)
   - Depois `updated` (DOM já foi atualizado)
   - Repara na diferença entre `this.weight` e o que o DOM mostra em cada hook

3. **Ao clicar em "Desmontar Ex3"** (botão no `App.vue`):
   - Verás `beforeUnmount` e `unmounted`

> **Cuidado:** Evita criar loops infinitos no hook `updated` (ex: modificar dados que causem nova atualização).

**Nota:** Existem [mais lifecycle hooks disponíveis](https://vuejs.org/api/options-lifecycle.html), mas os demonstrados neste exercício (`beforeCreate`, `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`) são os mais utilizados na maioria dos casos.

---

### Exercício 4 - Diretivas e Aplicação Completa

**Objetivo:** Aplicar múltiplas diretivas num cenário real (lista de produtos).

**Conceitos:**

- `v-for` - Renderizar listas dinamicamente
- `:key` - Identificador único (essencial para performance)
- `v-if` - Renderização condicional
- `v-bind` (ou `:`) - Atributos dinâmicos (`:src`, `:alt`, `:class`, `:disabled`)
- `@click` (ou `v-on:click`) - Event handlers
- `:class` - Classes CSS dinâmicas com arrays e operador ternário
- [`v-html`](https://vuejs.org/api/built-in-directives.html#v-html) - Renderizar HTML
  - Utilizar apenas com conteúdo **confiável**
  - Em desenvolvimento local com dados mock, o risco é quase nulo
  - Em produção, preferir alternativas estruturadas (ex: conversão manual, recorrer a bibliotecas de sanitização e validação, etc.)
- Acessibilidade - ARIA labels, roles, `sr-only`

**Ficheiro:** [`Ex4.vue`](src/components/Ex4.vue)

**Funcionalidades:**

- Lista de produtos com imagem, nome, especificações, preço e disponibilidade
- Botão "Vender" (marca produto como indisponível)
- Botão "Repor Preço" (restaura preço original)
- Preço só é visível se `>= 0` e `< 1200`
  - As validações dependem da lógica de negócio de cada aplicação.

**Boas práticas:**

- IDs únicos para `:key` (não índices)
- Validação de dados nos métodos
- Armazenamento de estado original (`originalPrices`)
- Conversão de HTML (`<br>`) para array estruturado
- Acessibilidade com ARIA e `sr-only`

### Destaques de Implementação

**1. Classes CSS Dinâmicas com Array e Operador Ternário**

```vue
:class="[ 'product-availability', product.productAvailable ? 'product-available' :
'product-unavailable', ]"
```

- O `:class` pode receber um **array** com múltiplas classes
- `'product-availability'` - classe base sempre aplicada
- Operador ternário adiciona classe condicional:
  - Se `productAvailable` é `true` → adiciona `product-available`
  - Se `productAvailable` é `false` → adiciona `product-unavailable`
- Para lógica mais complexa, seria melhor utilizar uma **computed property** (mais legível e com cache). Neste caso, sendo simples, inline é aceitável.

**2. Guardar Estado Original no Hook `created()`**

```javascript
created() {
  this.products.forEach((product) => {
    this.originalPrices[product.id] = product.price
  })
}
```

- Hook `created()` executa quando o componente é criado
- Itera sobre todos os produtos e guarda os preços originais em `originalPrices`
- Permite repor o preço original depois (botão "Repor Preço")
- Alternativa a guardar diretamente em `data()` - mais limpo e reativo

**3. Validação Segura de Propriedades em Objetos**

```javascript
if (!id || !Object.prototype.hasOwnProperty.call(this.originalPrices, id)) {
  return
}
```

- Verifica se `id` existe e se `originalPrices` tem essa propriedade
- `Object.prototype.hasOwnProperty.call()` é mais seguro que `obj.hasOwnProperty()`
  - Funciona mesmo se o objeto não tiver o método `hasOwnProperty` na sua chain
  - Evita problemas com objetos criados com `Object.create(null)`
- Boa prática para prevenir erros em runtime

**Recursos adicionais:**

- [MDN - Object.prototype.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
- [Stack Overflow - Why use Object.prototype.hasOwnProperty.call()?](https://stackoverflow.com/questions/12017693/why-use-object-prototype-hasownproperty-callmyobj-prop-instead-of-myobj-hasow)
- [Dev.to - What's the deal with Object.prototype.hasOwnProperty.call?](https://dev.to/aman_singh/what-s-the-deal-with-object-prototype-hasownproperty-call-4mbj)


## Recursos Úteis

- [Vue.js - Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)
- [Vue.js - Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Vue.js - Computed Properties](https://vuejs.org/guide/essentials/computed.html)
- [Vue.js - Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [Vue.js - List Rendering](https://vuejs.org/guide/essentials/list.html)
- [Vue.js - Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html)
- [Vue.js - Built-in Directives](https://vuejs.org/api/built-in-directives.html)
