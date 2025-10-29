# FAQ Section - Named Slots para Componentes Flexíveis

Quinto e último exercício da **Worksheet 03** para explorar **slots** - um mecanismo que permite criar componentes verdadeiramente reutilizáveis ao aceitar conteúdo customizado do pai.

## Objetivo

Criar uma secção de FAQs que demonstra como **slots** permitem que o componente pai passe blocos de conteúdo HTML para o filho, tornando componentes genéricos e reutilizáveis em múltiplos contextos.

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

- [`App.vue`](src/App.vue) - Mantém array de FAQs e passa conteúdo via slots
- [`FAQSection.vue`](src/components/FAQSection.vue) - Orquestra múltiplos FAQItems e controla qual está aberto
- [`FAQItem.vue`](src/components/FAQItem.vue) - Define **3 named slots** para aceitar conteúdo customizado


## Conceitos

### Slots - Conteúdo Customizado nos Componentes

**Slots** são placeholders que permitem ao componente **pai** passar conteúdo HTML para o componente **filho**. O filho define **onde** o conteúdo aparece, mas não controla **o quê** é renderizado.

**Analogia:** Slots são como molduras de quadros - o filho fornece a moldura (estrutura, estilos), o pai fornece o quadro (conteúdo).

**Problema que resolvem:**

```vue
<!-- ❌ Sem slots: componente rígido -->
<BaseButton text="Clica aqui" />
<!-- Só aceita texto, não permite ícones, links, formatação -->

<!-- ✅ Com slots: componente flexível -->
<BaseButton>
  <strong>Clica</strong> aqui
  <Icon name="arrow" />
</BaseButton>
<!-- Pai controla completamente o conteúdo -->
```

---

### Named Slots

Quando um componente precisa de **múltiplos pontos de inserção**, utilizamos **named slots**. Cada slot tem um nome único.

**No componente filho (FAQItem.vue):**

```vue
<template>
  <div class="faq-item">
    <h3>
      <!-- Slot "title" -->
      <slot name="title">Título por defeito</slot>
    </h3>
    
    <p>
      <!-- Slot "subtitle" (opcional) -->
      <slot name="subtitle"></slot>
    </p>
    
    <div>
      <!-- Slot "body" -->
      <slot name="body">Conteúdo por defeito</slot>
    </div>
  </div>
</template>
```

**No componente pai (FAQSection.vue):**

```vue
<template>
  <FAQItem>
    <!-- Preenche slot "title" -->
    <template #title>
      {{ faq.title }}
    </template>
    
    <!-- Preenche slot "subtitle" -->
    <template #subtitle>
      {{ faq.subtitle }}
    </template>
    
    <!-- Preenche slot "body" -->
    <template #body>
      {{ faq.body }}
    </template>
  </FAQItem>
</template>
```

> **Sintaxe:** `#nome` é shorthand de `v-slot:nome`

**Porquê 3 slots separados em vez de 1?**
- Filho controla **estrutura e estilos** de cada secção independentemente
- Pai pode omitir slots opcionais (subtitle)
- Mais flexível para casos de uso diferentes

---

### Slot Default Content

Slots podem ter **conteúdo por defeito** que aparece quando o pai não fornece nada:

```vue
<!-- No filho -->
<slot name="title">Título por defeito</slot>

<!-- Se o pai não passar nada: -->
<FAQItem />
<!-- Renderiza: "Título por defeito" -->

<!-- Se o pai passar conteúdo: -->
<FAQItem>
  <template #title>Meu Título</template>
</FAQItem>
<!-- Renderiza: "Meu Título" -->
```

---

### Verificar se Slot foi Preenchido

Podes verificar se um slot tem conteúdo usando `$slots`:

```vue
<!-- Só renderiza <p> se o pai passou conteúdo para subtitle -->
<p v-if="$slots.subtitle">
  <slot name="subtitle"></slot>
</p>
```

Isto evita renderizar HTML vazio quando o slot é opcional.

---

### Props vs Slots - Quando Utilizar?

**Props:**
- ✅ Dados primitivos (strings, numbers, booleans)
- ✅ Objetos estruturados
- ✅ Filho decide como renderizar

**Slots:**
- ✅ Conteúdo HTML com formatação
- ✅ Componentes aninhados
- ✅ Pai decide como renderizar

**Exemplo neste exercício:**

```vue
<!-- ❌ Props: filho controla formatação -->
<FAQItem title="Título" subtitle="Resumo" />
<!-- Filho decide tamanho da fonte, cor, se usa <strong>, etc -->

<!-- ✅ Slots: pai controla formatação -->
<FAQItem>
  <template #title>
    <strong>Título</strong> <Icon name="info" />
  </template>
</FAQItem>
<!-- Pai tem controlo total sobre HTML -->
```

**Neste exercício utilizamos props para o array e slots para conteúdo:**
- **Prop `faqs`**: array de dados estruturados (id, title, body)
- **Slots**: renderização customizada do conteúdo de cada FAQ

---

### Controlled Component Pattern

FAQItem é um **componente controlado** - não gere o seu próprio estado `isOpen`:

```vue
<!-- Filho recebe estado via prop -->
<script>
props: {
  isOpen: { type: Boolean, required: true }
}
</script>

<!-- Filho emite evento quando user clica -->
<div @click="$emit('toggle')">
```

**Vantagens:**
- Pai tem controlo total sobre o estado
- Permite implementar "apenas 1 aberto" facilmente
- Pai sincroniza estado entre múltiplos filhos

**Implementação de 1 FAQ aberto de cada vez:**

```javascript
data() {
  return {
    openFaqId: null  // Null = nenhum aberto
  }
},
methods: {
  handleToggle(faqId) {
    // Fecha se já está aberto, senão abre o novo
    this.openFaqId = this.openFaqId === faqId ? null : faqId
  }
}
```

## Boas Práticas

**Slots:**
- Utilizar named slots quando há múltiplos pontos de inserção
- Fornecer default content sensato para slots opcionais
- Utilizar `$slots.nome` para renderização condicional
- Documentar que slots o componente aceita

**Quando criar componentes com slots:**
- ✅ Estrutura fixa, conteúdo variável (cards, modals, layouts)
- ✅ Múltiplos pontos de customização
- ✅ Componente será utilizado em contextos diferentes
- ❌ Conteúdo sempre igual (utilizar props)

**Resumo:**
- Props para **dados e configuração**
- Eventos para **comunicação** filho → pai
- Slots para **estrutura e conteúdo HTML**

## Recursos Úteis

- [Vue.js - Slots](https://vuejs.org/guide/components/slots.html)
