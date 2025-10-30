<template>
  <div class="article-view">
    <!-- Artigo não encontrado (ID inválido) -->
    <div v-if="notFound" class="not-found">
      <h1>Article Not Found</h1>
      <p>Sorry, the article you're looking for doesn't exist or may have been removed.</p>
      <RouterLink to="/articles" class="back-button"> Back to Articles </RouterLink>
    </div>

    <!-- Artigo encontrado - mostra o conteúdo completo -->
    <article v-else class="article-content">
      <RouterLink to="/articles" class="back-link"> ← Back to Articles </RouterLink>

      <h1>{{ article.title }}</h1>

      <div class="meta">
        <span class="author">By {{ article.author }}</span>
      </div>

      <div class="content">
        <p v-for="(paragraph, index) in formattedContent" :key="index">
          {{ paragraph }}
        </p>
      </div>
    </article>
  </div>
</template>

<script>
import { articles, getArticleById } from '@/data/articles'

export default {
  name: 'ArticleView',
  data() {
    return {
      articles: articles,
    }
  },
  computed: {
    // Computed property que procura o artigo baseado no ID do URL
    article() {
      // $route.params.id contém o valor capturado do URL
      const id = this.$route.params.id
      return getArticleById(id)
    },

    // Verifica se o artigo não foi encontrado
    notFound() {
      const id = this.$route.params.id
      return id && !this.article
    },

    // Formata o conteúdo em parágrafos
    formattedContent() {
      if (!this.article) return []

      // Split por linhas vazias e remove whitespace extra
      return this.article.content
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    },
  },
}
</script>

<style scoped>
.not-found h1 {
  color: var(--red);
}

.back-button {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  padding: 1rem 2rem;
  border-radius: 8px;
  line-height: 1.7;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
}

.back-button:hover {
   background-color: var(--black-muted);
}

.back-link {
  display: inline-block;
  color: var(--text-dark-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--green);
}

.article-content h1 {
  font-size: 2.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.meta {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(84, 84, 84, 0.65);
}

.author {
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-style: italic;
}

.content {
  font-size: 1.1rem;
  line-height: 1.8;
}

.content p {
  margin-bottom: 1.5rem;
}
</style>
