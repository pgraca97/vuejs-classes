import { authenticateUser, canAccessRoute } from '@/data/adminhub-data.js'

const AUTH_KEY = 'adminhub-auth'
const NAVIGATION_HISTORY_KEY = 'adminhub-nav-history'

// Store de autenticação (sem Pinia)
// Gere sessão de utilizador e audit trail com localStorage
export const authStore = {
  // Obtém utilizador autenticado do localStorage
  getUser() {
    const stored = localStorage.getItem(AUTH_KEY)
    return stored ? JSON.parse(stored) : null
  },

  // Verifica se utilizador está autenticado
  isAuthenticated() {
    return this.getUser() !== null
  },

  // Autentica utilizador
  login(username, password) {
    const user = authenticateUser(username, password)

    if (user) {
      // Guarda utilizador no localStorage (sem password)
      localStorage.setItem(AUTH_KEY, JSON.stringify(user))
      return { success: true, user }
    }

    return { success: false, error: 'Credenciais inválidas' }
  },

  // Termina sessão
  logout() {
    localStorage.removeItem(AUTH_KEY)
    this.clearNavigationHistory()
  },

  // Verifica se utilizador tem permissão para aceder (role-based)
  canAccess(requiredRoles) {
    const user = this.getUser()

    if (!user) return false
    if (!requiredRoles || requiredRoles.length === 0) return true

    return canAccessRoute(user.role, requiredRoles)
  },

  // Adiciona navegação ao audit trail
  addNavigation(from, to) {
    const user = this.getUser()
    if (!user) return

    const history = this.getNavigationHistory()

    const navigation = {
      id: Date.now(),
      user: user.name,
      userId: user.id,
      fromRoute: from.name || from.path,
      toRoute: to.name || to.path,
      timestamp: new Date().toISOString(),
    }

    history.unshift(navigation)

    // Limita a 100 entradas para não encher o localStorage
    const limitedHistory = history.slice(0, 100)

    localStorage.setItem(NAVIGATION_HISTORY_KEY, JSON.stringify(limitedHistory))
  },

  // Obtém histórico de navegação completo
  getNavigationHistory() {
    const stored = localStorage.getItem(NAVIGATION_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  },

  // Limpa histórico de navegação
  clearNavigationHistory() {
    localStorage.removeItem(NAVIGATION_HISTORY_KEY)
  },
}
