<script>
import FaqSection from './components/FaqSection.vue';


export default {
  name: 'App',
  components: {
    FaqSection,
  },
  data() {
    return {
      faqs: [
        {
          id: crypto.randomUUID(),
          title: 'O que é Vue.js?',
          subtitle: 'Framework JavaScript progressivo para construir interfaces de utilizador.',
          body: 'Vue.js é um framework JavaScript open-source criado por Evan You em 2014. É conhecido pela sua simplicidade e flexibilidade, permitindo que desenvolvedores construam interfaces de utilizador interativas de forma incremental. Ao contrário de frameworks mais pesados, o Vue pode ser adotado gradualmente, começando como uma simples biblioteca e evoluindo para um framework completo conforme as necessidades do projeto crescem.',
        },
        {
          id: crypto.randomUUID(),
          title: 'Como funciona a reatividade no Vue?',
          subtitle: 'Sistema que atualiza automaticamente a interface quando os dados mudam.',
          body: 'O Vue utiliza um sistema de reatividade baseado em proxies (no Vue 3) que deteta quando as propriedades dos dados mudam. Quando alteras uma propriedade reativa, o Vue automaticamente atualiza apenas as partes da interface que dependem dessa propriedade. Isto torna as aplicações Vue extremamente eficientes, porque não precisas de re-renderizar toda a página, apenas os componentes afetados pela mudança.',
        },
        {
          id: crypto.randomUUID(),
          title: 'Qual a diferença entre props e slots?',
          subtitle: 'Props passam dados, slots passam conteúdo HTML.',
          body: 'Props são utilizadas para passar dados estruturados (strings, numbers, objetos, arrays) de um componente pai para um filho. O componente filho decide como renderizar esses dados. Slots, por outro lado, permitem que o componente pai passe blocos de HTML já formatados para o filho. O componente filho apenas define onde esse conteúdo vai aparecer, mas não controla o que é. Props são como parâmetros de uma função, slots são como placeholders numa template.',
        },
        {
          id: crypto.randomUUID(),
          title: 'Quando devo utilizar componentes?',
          subtitle: 'Sempre que tiveres código reutilizável ou queiras organizar melhor.',
          body: 'Cria componentes quando tens código que vai ser reutilizado em múltiplos sítios, quando uma parte da interface tem uma responsabilidade clara e única, ou quando queres organizar melhor o código dividindo-o em partes lógicas. Uma boa regra é: se consegues descrever uma parte da interface numa frase simples, provavelmente deve ser um componente. Por exemplo, "um botão que adiciona tarefas" ou "um card que mostra informação de um produto".',
        },
        {
          id: crypto.randomUUID(),
          title: 'Como comunicam os componentes entre si?',
          subtitle: 'Através de props e eventos para componentes pai-filho.',
          body: 'Os componentes comunicam através de props (dados descem do pai para filho) e eventos (notificações sobem do filho para pai). Este padrão unidirecional torna o fluxo de dados previsível e fácil de debugar. O pai é sempre a fonte de verdade dos dados, e os filhos notificam o pai quando algo acontece. Para comunicação entre componentes que não são pai-filho direto, podes utilizar um event bus, provide/inject, ou uma store centralizada como Pinia.',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="app">
    <h1>Documentação Vue.js</h1>
    <FaqSection :faqs="faqs" />
  </div>
</template>

<style>

.app {
  max-width: 800px;
  margin-inline: auto;
}

h1 {
  text-align: center;
}
</style>