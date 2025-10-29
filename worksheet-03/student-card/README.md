# Student Card - Introdução a Props

Primeiro exercício da **Worksheet 03** para explorar a passagem de dados do pai para filho através de **props**.

## Objetivo

Criar um componente reutilizável que recebe dados do pai e os apresenta de forma consistente, aplicando validações para garantir integridade dos dados.

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

- [`App.vue`](src/App.vue) - Componente pai que mantém o array de estudantes
- [`StudentCard.vue`](src/components/StudentCard.vue) - Componente filho que recebe e exibe dados via props


## Conceitos

### Props

**Props** (abreviação de properties) permitem que componentes pais passem dados para componentes filhos. São **read-only** no filho - só o pai pode modificá-los.

**Sintaxe no filho (StudentCard.vue):**

```javascript
props: {
  name: {
    type: String,      // Tipo esperado
    required: true     // Obrigatório
  },
  course: {
    type: String,
    default: 'TSIW'    // Valor se não for passado
  }
}
```

**Sintaxe no pai (App.vue):**

```vue
<StudentCard 
  :name="student.name" 
  :course="student.course" 
/>
```

> **Nota:** O `:` (dois pontos) é shorthand de `v-bind:` e permite passar valores dinâmicos (variáveis) em vez de strings literais.

---

### Required vs Optional Props

**Required (`required: true`):**
- Prop obrigatória - Vue avisa no console se não for passada
- Utilizar para dados essenciais ao funcionamento do componente

**Optional (com `default`):**
- Prop opcional - utiliza valor default se não for passada
- Útil para personalização sem quebrar funcionalidade básica

**Exemplo prático:**

```javascript
// ✅ Válido: name obrigatório passado, course utiliza default
<StudentCard name="Ana Silva" />

// ❌ Inválido: name obrigatório não foi passado
<StudentCard course="TSIW" />
```

---

### Validators

**Validators** são funções que verificam se o valor da prop é válido antes de o componente utilizar.

**Sintaxe:**

```javascript
props: {
  year: {
    type: Number,
    validator(value) {
      // Retorna true se válido, false se inválido
      if (value < 1 || value > 3) {
        console.warn(`Invalid year: ${value}. Must be between 1 and 3.`)
        return false
      }
      return true
    }
  }
}
```

**Comportamento:**
- Se `validator` retorna `false`, Vue mostra warning no console
- O componente **continua a renderizar** mesmo com valor inválido
- Útil para desenvolvimento e debugging

> **Atenção:** Validators são para validação de dados recebidos, não substituem as validações aplicacionais da vossa lógica de negócio.

---

### Kebab-case no Template

No template HTML, atributos devem usar **kebab-case** (hífenes), mas no JavaScript usamos **camelCase**.

```vue
<!-- Template: kebab-case -->
<StudentCard :student-number="123" />
```

```javascript
// JavaScript: camelCase
props: {
  studentNumber: Number
}
```

Vue faz a conversão automaticamente.

## Demonstração Prática

**No array de estudantes (App.vue):**

1. **Aluno com todos os dados:** Ana Silva (props explícitas)
2. **Aluno com defaults:** John Doe (course e year omitidos → usam defaults)
3. **Aluno com valor inválido:** Maria Costa (year: 5 → aciona validator)

**Resultado esperado:**

- 4 cards renderizados
- John Doe mostra "TSIW" e "2º" (valores default)
- Console mostra warning para Maria Costa (year inválido)

## Boas Práticas

- Sempre definir `type` nas props para melhor documentação e type checking
- Usar `required: true` para props essenciais
- Adicionar `default` para props opcionais
- Validar intervalos numéricos e formatos específicos com `validator`
- Usar kebab-case no template, camelCase no script


## Recursos Úteis

- [Vue.js - Props](https://vuejs.org/guide/components/props.html)