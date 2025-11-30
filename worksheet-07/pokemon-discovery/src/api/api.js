// URL base da PokeAPI
const BASE_URL = 'https://pokeapi.co/api/v2'

// Função utilitária para fazer pedidos GET à API
// Recebe um endpoint relativo e retorna os dados em JSON
export async function get(endpoint) {
  console.log(`API GET: ${BASE_URL}/${endpoint}`)

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Lança erro se a resposta não for bem-sucedida
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  console.log(data)
  return data
}
