import HomeView from '@/views/HomeView.vue'
import PokemonDetailView from '@/views/PokemonDetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Definição das rotas da aplicação
// - /: página principal com descoberta de Pokémon
// - /pokemon/:id: página de detalhe com parâmetro dinâmico
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/pokemon/:id',
    name: 'pokemon-detail',
    component: PokemonDetailView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
