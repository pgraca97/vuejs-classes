// Base de dados de utilizadores (em produção viria de uma API)
export const users = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@company.com',
    role: 'Administrator',
    joinDate: '2023-01-15',
    status: 'Active',
    department: 'IT'
  },
  {
    id: 2,
    name: 'Bruno Costa',
    email: 'bruno.costa@company.com',
    role: 'Editor',
    joinDate: '2023-03-22',
    status: 'Active',
    department: 'Marketing'
  },
  {
    id: 3,
    name: 'Carla Mendes',
    email: 'carla.mendes@company.com',
    role: 'Viewer',
    joinDate: '2023-05-10',
    status: 'Active',
    department: 'Sales'
  },
  {
    id: 4,
    name: 'Daniel Rodrigues',
    email: 'daniel.rodrigues@company.com',
    role: 'Editor',
    joinDate: '2023-07-08',
    status: 'Inactive',
    department: 'Support'
  },
  {
    id: 5,
    name: 'Eva Fernandes',
    email: 'eva.fernandes@company.com',
    role: 'Administrator',
    joinDate: '2022-11-30',
    status: 'Active',
    department: 'IT'
  }
]

// Helper para encontrar utilizador por ID
export function getUserById(id) {
  // Converte o id para número porque os params vêm sempre como string
  return users.find(user => user.id === Number(id))
}

// Helper para obter estatísticas
export function getUserStats() {
  return {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    inactive: users.filter(u => u.status === 'Inactive').length,
    administrators: users.filter(u => u.role === 'Administrator').length
  }
}