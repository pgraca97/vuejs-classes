# Counter Demo - Vanilla JS vs Vue.js

Demonstração visual via CDN (não hands-on) para comparar abordagens imperativa (vanilla JS) vs declarativa (Vue.js) para o mesmo resultado: um contador simples.

## Vanilla JS - Abordagem Imperativa

**Controlamos o "COMO fazer":**
1. Selecionar elementos DOM manualmente (`querySelector`)
2. Criar event listeners explícitos (`addEventListener`)
3. Atualizar DOM manualmente (`textContent`)

```javascript
// Temos que dizer exatamente o que fazer, passo a passo
const buttonElement = document.querySelector("button");
const countElement = document.querySelector(".count");
let count = 0;

buttonElement.addEventListener("click", () => {
  count++;
  countElement.textContent = count; // Atualização manual
});
```

## Vue.js - Abordagem Declarativa

**Definimos o "O QUE queremos":**
- Reatividade automática: dados mudam → interface atualiza
- Event binding simplificado: `@click` _(@ é shorthand de `v-on:`)_
- Vue atualiza DOM automaticamente

```javascript
// Definimos o estado e o resultado desejado
const { createApp } = Vue;

createApp({
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++; // Vue atualiza interface automaticamente
    }
  }
}).mount("#app");
```