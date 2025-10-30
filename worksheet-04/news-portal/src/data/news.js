// Base de dados de notícias
export const news = [
  {
    id: 1,
    title: 'Vue 3.5 Released with Major Performance Improvements',
    category: 'Technology',
    summary: 'The Vue.js team announces version 3.5 with significant performance enhancements and new features.',
    content: 'Vue.js 3.5 brings a host of performance improvements including faster reactivity system, reduced memory usage, and optimized virtual DOM operations. The new version also introduces better TypeScript support and improved developer experience with enhanced error messages.',
    featured: true,
    date: '2024-10-20'
  },
  {
    id: 2,
    title: 'Climate Summit Reaches Historic Agreement',
    category: 'Environment',
    summary: 'World leaders commit to aggressive carbon reduction targets at the annual climate conference.',
    content: 'Representatives from 195 countries have signed a landmark agreement to reduce global carbon emissions by 50% by 2030. The accord includes provisions for renewable energy investment and protection of natural habitats.',
    featured: true,
    date: '2024-10-19'
  },
  {
    id: 3,
    title: 'New AI Model Breaks Language Understanding Records',
    category: 'Technology',
    summary: 'Researchers unveil an AI system that achieves human-level performance on complex language tasks.',
    content: 'A team of AI researchers has developed a new language model that demonstrates unprecedented understanding of context and nuance. The model outperforms previous systems on benchmarks for reading comprehension, translation, and reasoning.',
    featured: false,
    date: '2024-10-18'
  },
  {
    id: 4,
    title: 'Stock Markets Rally on Economic Data',
    category: 'Business',
    summary: 'Major indices reach new highs following positive employment and inflation reports.',
    content: 'Global stock markets experienced significant gains today as economic indicators pointed to sustained growth. The S&P 500 and NASDAQ both reached record highs, driven by strong corporate earnings and optimistic economic forecasts.',
    featured: true,
    date: '2024-10-18'
  },
  {
    id: 5,
    title: 'Revolutionary Cancer Treatment Shows Promise',
    category: 'Health',
    summary: 'Clinical trials demonstrate high success rates for new immunotherapy approach.',
    content: 'A groundbreaking cancer treatment using modified immune cells has shown remarkable results in phase III clinical trials. Patients with previously untreatable forms of cancer experienced significant tumor reduction with minimal side effects.',
    featured: false,
    date: '2024-10-17'
  },
  {
    id: 6,
    title: 'Space Mission Discovers Water on Distant Moon',
    category: 'Science',
    summary: 'NASA probe finds evidence of liquid water beneath the surface of Europa.',
    content: 'Scientists analyzing data from the Europa Clipper mission have confirmed the presence of a vast subsurface ocean on Jupiter\'s moon Europa. The discovery raises exciting possibilities for the existence of extraterrestrial life.',
    featured: false,
    date: '2024-10-16'
  },
  {
    id: 7,
    title: 'Global Education Initiative Launches',
    category: 'Education',
    summary: 'International program aims to provide free online education to millions.',
    content: 'A coalition of tech companies and educational institutions has launched a platform offering free courses to students worldwide. The initiative focuses on STEM education and aims to reach underserved communities globally.',
    featured: false,
    date: '2024-10-16'
  },
  {
    id: 8,
    title: 'Renewable Energy Surpasses Fossil Fuels',
    category: 'Environment',
    summary: 'For the first time, renewable sources generate more electricity than traditional fuels.',
    content: 'According to new data, renewable energy sources including solar, wind, and hydroelectric now account for 52% of global electricity generation. This milestone marks a turning point in the transition to sustainable energy.',
    featured: false,
    date: '2024-10-15'
  },
  {
    id: 9,
    title: 'Breakthrough in Quantum Computing',
    category: 'Technology',
    summary: 'Researchers achieve quantum supremacy with 1000-qubit processor.',
    content: 'A research team has successfully built and tested a 1000-qubit quantum processor, marking a significant milestone in quantum computing. The achievement opens new possibilities for solving complex problems in cryptography, drug discovery, and climate modeling.',
    featured: false,
    date: '2024-10-15'
  },
  {
    id: 10,
    title: 'Major Sports Championship Concludes',
    category: 'Sports',
    summary: 'Underdog team claims victory in thrilling final match.',
    content: 'In a stunning upset, the underdogs clinched the championship title with a last-minute goal. The victory marks their first championship win in over two decades and sends fans into celebration.',
    featured: false,
    date: '2024-10-14'
  }
]

// Helper para obter todas as categorias únicas
export function getCategories() {
  const categories = [...new Set(news.map(n => n.category))]
  return categories.sort()
}

// Helper para filtrar notícias por categoria
export function getNewsByCategory(categoryName) {
  return news.filter(n => 
    n.category.toLowerCase() === categoryName.toLowerCase()
  )
}

// Helper para obter notícias em destaque
export function getFeaturedNews() {
  return news.filter(n => n.featured)
}

// Helper para obter notícia por ID
export function getNewsById(id) {
  return news.find(n => n.id === Number(id))
}