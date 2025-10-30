import { createRouter, createWebHistory } from 'vue-router'
import NewsListView from '../views/NewsListView.vue'
import SidebarView from '../views/SidebarView.vue'
import BannerView from '../views/BannerView.vue'
import CategoryView from '../views/CategoryView.vue'
import ArticleView from '../views/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Redirect: qualquer acesso a "/" é automaticamente redirecionado para "/home"
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      // Alias: esta rota também pode ser acedida através de "/inicio"
      // O URL no browser mantém-se como está (não muda)
      alias: '/inicio',
      // NAMED VIEWS: em vez de "component", utilizamos "components" (plural)
      // Isto permite renderizar múltiplos componentes em múltiplos RouterView
      components: {
        default: NewsListView, // RouterView sem nome (o principal)
        sidebar: SidebarView, // RouterView name="sidebar"
        banner: BannerView, // RouterView name="banner"
      },
    },
    {
      path: '/category/:name',
      components: {
        default: CategoryView,
        sidebar: SidebarView,
        banner: BannerView,
      },
      children: [
        {
          path: 'article/:id',
          name: 'article',
          component: ArticleView,
        },
      ],
    },
  ],
})

export default router
