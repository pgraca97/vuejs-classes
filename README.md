# Vue.js Classes - ESMAD TSIW 2024/25

Materiais das aulas práticas de Programação Web I.

## Estrutura

### **Semana 1** (29 set - 3 out)

#### `vanilla-vs-vue-counter-app/`

Demonstração visual comparando vanilla JS vs Vue (abordagem imperativa vs declarativa).

#### `watchlist-app/`

Primeiro projeto hands-on: lista de filmes com conceitos básicos (data, methods, v-model, v-for).

### **Semana 2** (6 out - 10 out)

#### `worksheet-01/`

Ficha de exercícios para consolidar conceitos fundamentais: interpolação, computed vs methods, lifecycle hooks, e diretivas (v-for, v-if, v-bind, v-on, v-html).

### **Semana 3** (13 out - 17 out)

#### `worksheet-02/`

Ficha de exercícios com dois projetos práticos:

- **Counter App** - Contador interativo com validação, atalhos de teclado e gestão de timeouts
- **Watch Vault** - Gestão de watchlist com formulário, ordenação dinâmica e persistência com localStorage

### **Semana 4** (20 out - 24 out)

#### `worksheet-03/`

Ficha de exercícios para consolidar conceitos de comunicação entre componentes via props, eventos personalizados e slots. Inclui os seguintes projetos:

- **Student Card** - Renderização de cartões de estudantes por props.
- **Product Card** - Interação dinâmica com props reativas e emissão de evento.
- **Movie Review** - Gestão de reviews de filmes com emit de eventos e estado centralizado.
- **Task Manager** - Gestão de tarefas com estado centralizado e persistência local.
- **FAQ Section** - Secção de perguntas frequentes utilizando named slots para flexibilidade.

## Requirements

**Software necessário:**

- Node.js (versão LTS)
- npm ou outro package manager
- VS Code ou outro IDE

**Verificar instalação:**

```bash
node --version
npm --version
git --version
```

## Extensões VS Code Recomendadas

- **Vue - Official** (vue.volar) - Syntax highlighting e IntelliSense
- **Vue VSCode Snippets** (sdras.vue-vscode-snippets) - Snippets para acelerar desenvolvimento
- **ESLint** (dbaeumer.vscode-eslint) - Deteção de erros
- **Prettier** (esbenp.prettier-vscode) - Formatação automática

## Setup Geral de Projetos Vue

```bash
# Criar novo projeto
npm create vue@latest

# Entrar na pasta
cd nome-do-projeto

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

> **Nota:** Cada projeto contém o seu próprio README com detalhes específicos.

## Recursos Úteis

- [Documentação Vue.js](https://vuejs.org/)
- [Vue DevTools](https://devtools.vuejs.org/)
