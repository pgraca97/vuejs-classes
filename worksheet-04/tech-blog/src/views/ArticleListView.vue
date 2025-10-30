<template>
  <div class="article-list">
    <h1>Tech Articles</h1>

    <div class="articles-grid">
      <article v-for="article in articles" :key="article.id" class="article-card">
        <h2>{{ article.title }}</h2>
        <p class="author">By {{ article.author }}</p>
        <p class="excerpt">{{ article.excerpt }}</p>

        <!-- RouterLink com binding dinâmico do ID -->
        <RouterLink :to="`/articles/${article.id}`" class="read-more">
          Read Full Article →
        </RouterLink>
      </article>
    </div>
  </div>
</template>

<script>
import { articles } from '@/data/articles'

export default {
  name: 'ArticleListView',
  data() {
    return {
      articles: articles,
    }
  },
}
</script>

<style scoped>

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1em;
  grid-auto-rows: 1fr;
}

.article-card {
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 1.5rem;
  
  display: flex;
  flex-direction: column;
}

.article-card h2 {
  color: var(--green);
  margin-bottom: 0.5rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.5em;
}

.author {
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-style: italic;
}

.excerpt {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  color: var(--text-dark-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
  
  margin-top: auto; 
}

.read-more:hover {
  color: var(--green);
}
</style>
