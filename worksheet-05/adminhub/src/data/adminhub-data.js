export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    name: 'Maria Silva',
    email: 'maria.silva@adminhub.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    department: 'IT',
    lastLogin: '2024-10-30T09:15:00',
    active: true,
  },
  {
    id: 2,
    username: 'manager',
    password: 'manager123',
    name: 'João Santos',
    email: 'joao.santos@adminhub.com',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=12',
    department: 'Sales',
    lastLogin: '2024-10-30T08:30:00',
    active: true,
  },
  {
    id: 3,
    username: 'viewer',
    password: 'viewer123',
    name: 'Ana Costa',
    email: 'ana.costa@adminhub.com',
    role: 'viewer',
    avatar: 'https://i.pravatar.cc/150?img=5',
    department: 'Marketing',
    lastLogin: '2024-10-29T16:45:00',
    active: true,
  },
  {
    id: 4,
    username: 'pedro',
    password: 'pedro123',
    name: 'Pedro Almeida',
    email: 'pedro.almeida@adminhub.com',
    role: 'manager',
    avatar: 'https://i.pravatar.cc/150?img=15',
    department: 'HR',
    lastLogin: '2024-10-28T14:20:00',
    active: true,
  },
  {
    id: 5,
    username: 'sofia',
    password: 'sofia123',
    name: 'Sofia Rodrigues',
    email: 'sofia.rodrigues@adminhub.com',
    role: 'viewer',
    avatar: 'https://i.pravatar.cc/150?img=9',
    department: 'Finance',
    lastLogin: '2024-10-27T11:00:00',
    active: false,
  },
]

export const analyticsData = {
  overview: {
    totalUsers: 1247,
    activeUsers: 892,
    newUsersThisMonth: 145,
    revenue: 284750,
    orders: 3421,
    conversionRate: 3.2,
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 245000 },
    { month: 'Fev', revenue: 198000 },
    { month: 'Mar', revenue: 267000 },
    { month: 'Abr', revenue: 298000 },
    { month: 'Mai', revenue: 312000 },
    { month: 'Jun', revenue: 289000 },
    { month: 'Jul', revenue: 325000 },
    { month: 'Ago', revenue: 298000 },
    { month: 'Set', revenue: 310000 },
    { month: 'Out', revenue: 284750 },
  ],
  usersByDepartment: [
    { department: 'IT', count: 89 },
    { department: 'Sales', count: 234 },
    { department: 'Marketing', count: 156 },
    { department: 'HR', count: 78 },
    { department: 'Finance', count: 123 },
    { department: 'Operations', count: 201 },
    { department: 'Customer Support', count: 366 },
  ],
  topProducts: [
    { id: 1, name: 'Product A', sales: 2341, revenue: 117050 },
    { id: 2, name: 'Product B', sales: 1876, revenue: 93800 },
    { id: 3, name: 'Product C', sales: 1654, revenue: 82700 },
    { id: 4, name: 'Product D', sales: 1432, revenue: 71600 },
    { id: 5, name: 'Product E', sales: 1209, revenue: 60450 },
  ],
}

export const activityLogs = [
  {
    id: 1,
    user: 'Maria Silva',
    action: 'Criou novo utilizador',
    target: 'João Santos',
    timestamp: '2024-10-30T09:15:23',
    type: 'create',
    details: 'Utilizador adicionado ao departamento de Sales',
  },
  {
    id: 2,
    user: 'João Santos',
    action: 'Atualizou produto',
    target: 'Product A',
    timestamp: '2024-10-30T08:45:10',
    type: 'update',
    details: 'Preço alterado de €45 para €50',
  },
  {
    id: 3,
    user: 'Ana Costa',
    action: 'Exportou relatório',
    target: 'Sales Report Q3',
    timestamp: '2024-10-29T16:30:45',
    type: 'export',
    details: 'Relatório exportado em formato PDF',
  },
  {
    id: 4,
    user: 'Maria Silva',
    action: 'Alterou permissões',
    target: 'Pedro Almeida',
    timestamp: '2024-10-29T14:20:00',
    type: 'permission',
    details: 'Role alterado de viewer para manager',
  },
  {
    id: 5,
    user: 'Pedro Almeida',
    action: 'Aprovou pedido',
    target: 'Leave Request #4521',
    timestamp: '2024-10-29T11:15:30',
    type: 'approval',
    details: 'Pedido de férias aprovado para 5 dias',
  },
  {
    id: 6,
    user: 'Sofia Rodrigues',
    action: 'Visualizou dashboard',
    target: 'Analytics Dashboard',
    timestamp: '2024-10-27T11:05:12',
    type: 'view',
    details: 'Acesso ao painel de analytics',
  },
  {
    id: 7,
    user: 'Maria Silva',
    action: 'Desativou utilizador',
    target: 'Sofia Rodrigues',
    timestamp: '2024-10-27T10:30:00',
    type: 'deactivate',
    details: 'Conta desativada por inatividade',
  },
  {
    id: 8,
    user: 'João Santos',
    action: 'Criou campanha',
    target: 'Black Friday 2024',
    timestamp: '2024-10-26T15:45:00',
    type: 'create',
    details: 'Campanha criada com 25% de desconto',
  },
]

// Funções helper
export function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username && u.password === password && u.active)
  if (user) {
    // Não retornar a password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

export function canAccessRoute(role, requiredRoles) {
  if (!requiredRoles || requiredRoles.length === 0) return true
  return requiredRoles.includes(role)
}

export function getUserById(id) {
  return users.find((u) => u.id === parseInt(id))
}
