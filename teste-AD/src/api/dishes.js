// API de comunicação com JSON Server
// Iniciar servidor: json-server --watch db.json --port 3000

const BASE_URL = 'http://localhost:3000'

// Request genérico com tratamento de erros
async function request(endpoint, options = {}) {
  const { method = 'GET', body = null } = options

  const config = { method }

  if (body) {
    config.headers = { 'Content-Type': 'application/json' }
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // DELETE não retorna conteúdo
  return method === 'DELETE' ? response.ok : await response.json()
}

// Métodos HTTP simplificados
function get(endpoint) {
  return request(endpoint, { method: 'GET' })
}

function post(endpoint, data) {
  return request(endpoint, { method: 'POST', body: data })
}

function put(endpoint, data) {
  return request(endpoint, { method: 'PUT', body: data })
}

function del(endpoint) {
  return request(endpoint, { method: 'DELETE' })
}

// GET /dishes - Todos os pratos
export function getAllDishes() {
  return get('/dishes')
}

// GET /dishes?category=:category - Pratos por categoria
export function getDishesByCategory(category) {
  if (!category) return getAllDishes()
  return get(`/dishes?category=${encodeURIComponent(category)}`)
}

// POST /dishes - Criar prato
export function createDish(dishData) {
  return post('/dishes', dishData)
}

// PUT /dishes/:id - Atualizar prato
export function updateDish(id, dishData) {
  return put(`/dishes/${id}`, dishData)
}

// DELETE /dishes/:id - Eliminar prato
export function deleteDish(id) {
  return del(`/dishes/${id}`)
}
