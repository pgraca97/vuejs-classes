# Movie Review - Eventos Aninhados e Gestão de Estado

Terceiro exercício da **Worksheet 03** para explorar eventos customizados através de múltiplos níveis de componentes e decisões arquiteturais sobre onde manter estado.

## Objetivo

Criar um sistema de reviews de filmes com componentes aninhados: um componente reutilizável (RatingStars) que comunica com o pai (MovieReview), que por sua vez comunica com o avô (App). 

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

- [`App.vue`](src/App.vue) - Mantém estado dos filmes e gere atualizações
- [`MovieReview.vue`](src/components/MovieReview.vue) - Apresenta dados do filme e orquestra eventos
- [`RatingStars.vue`](src/components/RatingStars.vue) - Componente reutilizável de rating (5 estrelas)



## Conceitos

### Eventos Aninhados (Multi-Level Events)

Quando eventos precisam de **atravessar múltiplos níveis** de componentes, cada componente intermédio reemite o evento para cima.

**Hierarquia deste exercício:**

```
App (mantém estado: movies[])
  ↑ events: @rating-changed, @mark-as-watched
  ↓ props: movie
MovieReview (orquestra, não guarda estado)
  ↑ events: @rating-changed
  ↓ props: rating
RatingStars (UI pura, sem lógica de negócio)
```

**Fluxo de um evento de rating:**

```
1. User clica numa estrela em RatingStars
   ↓
2. RatingStars emite: this.$emit('rating-changed', 3)
   ↓
3. MovieReview recebe em handleRatingChange(rating)
   ↓
4. MovieReview reemite: this.$emit('rating-changed', this.movie.id, rating)
   ↓
5. App recebe em updateMovieRating(movieId, newRating)
   ↓
6. App atualiza: movie.rating = newRating
   ↓
7. Vue reage: MovieReview recebe novo movie.rating via props
   ↓
8. MovieReview passa para RatingStars: :rating="movie.rating"
   ↓
9. RatingStars atualiza UI (estrelas preenchidas)
```

**Implementação:**

```vue
<!-- RatingStars.vue -->
<template>
  <svg @click="selectRating(star)" />
</template>
<script>
methods: {
  selectRating(star) {
    this.$emit('rating-changed', star)  // Emite só o rating
  }
}
</script>

<!-- MovieReview.vue -->
<template>
  <RatingStars @rating-changed="handleRatingChange" />
</template>
<script>
methods: {
  handleRatingChange(rating) {
    // Adiciona contexto (movie.id) e reemite
    this.$emit('rating-changed', this.movie.id, rating)
  }
}
</script>

<!-- App.vue -->
<template>
  <MovieReview @rating-changed="updateMovieRating" />
</template>
<script>
methods: {
  updateMovieRating(movieId, newRating) {
    const movie = this.movies.find(m => m.id === movieId)
    movie.rating = newRating  // Atualiza estado
  }
}
</script>
```

**Porquê reemitir em vez de callback direto?**

- ✅ Mantém componentes desacoplados
- ✅ MovieReview não precisa de saber como App gere dados
- ✅ Facilita reutilização e testing
- ❌ Callback direto criaria dependência forte: `<RatingStars :onRate="handleInApp" />`

---

### Componentes Reutilizáveis

**RatingStars** é um bom exemplo de componente reutilizável:

**Características:**
- **Genérico**: Não sabe nada sobre filmes, apenas sobre ratings
- **Controlado**: Recebe rating via props, não guarda internamente
- **Comunicativo**: Emite evento quando user interage
- **Self-contained**: UI e lógica de interação incluídas

**Poderia ser usado noutros contextos:**

```vue
<!-- Reviews de restaurantes -->
<RatingStars :rating="restaurant.stars" @rating-changed="updateRestaurant" />

<!-- Avaliação de produtos -->
<RatingStars :rating="product.score" @rating-changed="updateProduct" />

<!-- Feedback de artigos -->
<RatingStars :rating="article.rating" @rating-changed="rateArticle" />
```

**Princípios de reusabilidade:**

1. **Props genéricas**: `rating` é mais genérico que `movieRating`
2. **Sem lógica de domínio**: RatingStars não sabe o que é um "filme"
3. **Eventos descritivos**: `rating-changed` descreve o que aconteceu
4. **UI self-contained**: Inclui o seu próprio hover state

---

### Passagem de Múltiplos Argumentos em Eventos

Eventos podem carregar **múltiplos valores** no payload:

```javascript
// Emitir múltiplos argumentos
this.$emit('rating-changed', this.movie.id, rating)

// Receber no pai
<MovieReview @rating-changed="updateMovieRating" />

methods: {
  updateMovieRating(movieId, newRating) {
    // movieId = primeiro argumento
    // newRating = segundo argumento
  }
}
```

**Alternativa - Objeto único:**

```javascript
// Emitir objeto
this.$emit('rating-changed', {
  movieId: this.movie.id,
  rating: rating,
  timestamp: Date.now()
})

// Receber
updateMovieRating(payload) {
  const { movieId, rating, timestamp } = payload
}
```

**Quando utilizar cada abordagem:**

- **Múltiplos argumentos**: 2-3 valores simples
- **Objeto**: 4+ valores ou quando precisas de adicionar mais dados no futuro


## Demonstração Prática

**Testa o fluxo completo:**

1. Clica na 3ª estrela de "Longlegs"
2. Observa:
   - Estrelas 1-3 ficam preenchidas (amarelo)
   - Aparece "Classificação: 3/5"
   - Botão muda para "Já Visto"
   - Border do card fica verde
   - Ícone de check aparece no título

3. Abre Vue DevTools → Components
4. Seleciona o MovieReview de "Longlegs"
5. Vê nas props: `movie.rating: 3`, `movie.isWatched: true`
6. Navega para App
7. Vê no data: `movies[3].rating: 3`

**O que está a acontecer:**

```
User clica → RatingStars emite 3
              ↓
MovieReview recebe 3, reemite com ID
              ↓
App atualiza movies[3].rating = 3
              ↓
Vue deteta mudança, passa nova prop
              ↓
MovieReview recebe movie com rating: 3
              ↓
Passa :rating="3" para RatingStars
              ↓
RatingStars atualiza UI
```


## Boas Práticas

**Arquitetura:**
- Estado no ancestral comum mais próximo
- Componentes filhos controlados (props in, events out)
- Componentes reutilizáveis sem lógica de domínio

**Eventos:**
- Nomes descritivos: `rating-changed` não `update` ou `change`
- Incluir contexto necessário no payload (IDs, etc.)
- Reemitir eventos com informação adicional quando necessário

**Props:**
- Passar objetos completos quando há muitas propriedades relacionadas
- Validar structure de objects em validators

**Decisões:**
- Guardar estado de UI local no componente (isExpanded, showTooltip)
- Guardar dados de domínio no pai (rating, isWatched, user data)

## Recursos Úteis

- [Vue.js - Component Events](https://vuejs.org/guide/components/events.html)
- [Vue.js - Props](https://vuejs.org/guide/components/props.html)
- [Vue.js Guide - Thinking in Components](https://vuejs.org/guide/essentials/component-basics.html)