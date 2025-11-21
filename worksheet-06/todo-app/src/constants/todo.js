// Lista canónica de prioridades
export const PRIORITIES = Object.freeze(['baixa', 'média', 'alta'])
export const DEFAULT_PRIORITY = 'média'

// Normalização e validação
export const normalizePriority = (p) => (typeof p === 'string' ? p.trim().toLowerCase() : '')

export const isValidPriority = (p) => PRIORITIES.includes(p)

// Lista canónica de filtros
export const FILTERS = Object.freeze(['todas', 'pendentes', 'concluídas'])