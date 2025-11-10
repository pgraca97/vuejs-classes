<template>
  <div class="analytics-view">
    <h1>Analytics Dashboard</h1>
    <p class="subtitle">Visualização de dados e métricas do sistema</p>

    <!-- Cards de métricas principais -->
    <section class="metrics">
      <div class="metric-card">
        <div class="metric-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="134"
            height="134"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
          </svg>
        </div>
        <div class="metric-content">
          <div class="metric-value">€{{ formatNumber(overview.revenue) }}</div>
          <div class="metric-label">Receita Total</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="134"
            height="134"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-package-icon lucide-package"
          >
            <path
              d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
            />
            <path d="M12 22V12" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <path d="m7.5 4.27 9 5.15" />
          </svg>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ overview.orders }}</div>
          <div class="metric-label">Encomendas</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="134"
            height="134"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chart-line-icon lucide-chart-line"
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ overview.conversionRate }}%</div>
          <div class="metric-label">Taxa de Conversão</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="134"
            height="134"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ampersands-icon lucide-ampersands"
          >
            <path
              d="M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"
            />
            <path
              d="M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"
            />
          </svg>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ overview.activeUsers }}</div>
          <div class="metric-label">Utilizadores Ativos</div>
        </div>
      </div>
    </section>

    <!-- Receita Mensal -->
    <section class="chart-section">
      <h2>Receita Mensal (€)</h2>
      <div class="simple-chart">
        <div v-for="month in monthlyRevenue" :key="month.month" class="chart-bar">
          <div class="bar-fill" :style="{ height: getBarHeight(month.revenue) + '%' }"></div>
          <div class="bar-label">{{ month.month }}</div>
        </div>
      </div>
    </section>

    <!-- Utilizadores por Departamento -->
    <section class="chart-section">
      <h2>Utilizadores por Departamento</h2>
      <div class="department-list">
        <div v-for="dept in usersByDepartment" :key="dept.department" class="department-item">
          <div class="department-name">{{ dept.department }}</div>
          <div class="department-bar-container">
            <div class="department-bar" :style="{ width: getDeptBarWidth(dept.count) + '%' }"></div>
          </div>
          <div class="department-count">{{ dept.count }}</div>
        </div>
      </div>
    </section>

    <!-- === DESAFIO: Audit Trail === -->
    <section class="audit-trail">
      <div class="audit-header">
        <h2>Histórico de Navegação (Audit Trail)</h2>
        <p>Registo de todas as navegações do utilizador autenticado</p>
      </div>

      <!-- Filtros por data -->
      <div class="audit-filters">
        <div class="filter-group">
          <label for="startDate">De:</label>
          <input
            id="startDate"
            type="date"
            v-model="auditFilters.startDate"
            @change="filterAuditTrail"
          />
        </div>

        <div class="filter-group">
          <label for="endDate">Até:</label>
          <input
            id="endDate"
            type="date"
            v-model="auditFilters.endDate"
            @change="filterAuditTrail"
          />
        </div>

        <button @click="clearFilters" class="clear-filters">Limpar Filtros</button>

        <button @click="exportAuditTrail" class="export-button">Exportar CSV</button>
      </div>

      <!-- Estatísticas do audit trail -->
      <div class="audit-stats">
        <div class="stat">
          <strong>Total de Navegações:</strong> {{ filteredAuditTrail.length }}
        </div>
        <div class="stat"><strong>Utilizador:</strong> {{ currentUser.name }}</div>
      </div>

      <!-- Tabela de audit trail -->
      <div class="audit-table-container">
        <table class="audit-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>De</th>
              <th>Para</th>
              <th>Utilizador</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in paginatedAuditTrail" :key="entry.id">
              <td>{{ formatTimestamp(entry.timestamp) }}</td>
              <td>
                <span class="route-badge">{{ entry.fromRoute }}</span>
              </td>
              <td>
                <span class="route-badge">{{ entry.toRoute }}</span>
              </td>
              <td>{{ entry.user }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Paginação -->
        <div v-if="totalPages > 1" class="pagination">
          <button @click="currentPage--" :disabled="currentPage === 1" class="pagination-button">
            ← Anterior
          </button>

          <span class="pagination-info"> Página {{ currentPage }} de {{ totalPages }} </span>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="pagination-button"
          >
            Seguinte →
          </button>
        </div>
      </div>

      <!-- Mensagem se não houver dados -->
      <div v-if="filteredAuditTrail.length === 0" class="no-data">
        <p>Nenhuma navegação registada para os filtros aplicados.</p>
        <p class="hint">Experimenta navegar entre páginas para gerar dados!</p>
      </div>
    </section>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'
import { analyticsData } from '@/data/adminhub-data.js'

export default {
  name: 'AnalyticsView',

  data() {
    return {
      currentUser: null,
      overview: analyticsData.overview,
      monthlyRevenue: analyticsData.monthlyRevenue,
      usersByDepartment: analyticsData.usersByDepartment,
      // Audit trail
      auditTrail: [],
      filteredAuditTrail: [],
      auditFilters: {
        startDate: '',
        endDate: '',
      },
      // Paginação
      currentPage: 1,
      itemsPerPage: 10,
    }
  },

  computed: {
    // Valor máximo para normalizar altura das barras do gráfico
    maxRevenue() {
      return Math.max(...this.monthlyRevenue.map((m) => m.revenue))
    },

    // Valor máximo de utilizadores por departamento
    maxDeptCount() {
      return Math.max(...this.usersByDepartment.map((d) => d.count))
    },

    totalPages() {
      return Math.ceil(this.filteredAuditTrail.length / this.itemsPerPage)
    },

    // Entradas do audit trail para a página atual (paginação)
    paginatedAuditTrail() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredAuditTrail.slice(start, end)
    },
  },

  methods: {
    formatNumber(num) {
      return num.toLocaleString('pt-PT')
    },

    // Calcula altura da barra (percentagem relativa ao máximo)
    getBarHeight(revenue) {
      return (revenue / this.maxRevenue) * 100
    },

    // Calcula largura da barra de departamento
    getDeptBarWidth(count) {
      return (count / this.maxDeptCount) * 100
    },

    formatTimestamp(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('pt-PT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },

    loadAuditTrail() {
      this.auditTrail = authStore.getNavigationHistory()
      this.filteredAuditTrail = [...this.auditTrail]
    },

    // Filtra audit trail por intervalo de datas
    filterAuditTrail() {
      const { startDate, endDate } = this.auditFilters

      if (!startDate && !endDate) {
        this.filteredAuditTrail = [...this.auditTrail]
        return
      }

      this.filteredAuditTrail = this.auditTrail.filter((entry) => {
        const entryDate = new Date(entry.timestamp)
        entryDate.setHours(0, 0, 0, 0)

        if (startDate) {
          const start = new Date(startDate)
          start.setHours(0, 0, 0, 0)
          if (entryDate < start) return false
        }

        if (endDate) {
          const end = new Date(endDate)
          end.setHours(23, 59, 59, 999)
          if (entryDate > end) return false
        }

        return true
      })

      // Reset paginação ao filtrar
      this.currentPage = 1
    },

    clearFilters() {
      this.auditFilters.startDate = ''
      this.auditFilters.endDate = ''
      this.filteredAuditTrail = [...this.auditTrail]
      this.currentPage = 1
    },

    // Exporta audit trail filtrado para CSV
    exportAuditTrail() {
      if (this.filteredAuditTrail.length === 0) {
        alert('Não há dados para exportar!')
        return
      }

      // Cria CSV
      const headers = ['Data/Hora', 'De', 'Para', 'Utilizador']
      const rows = this.filteredAuditTrail.map((entry) => [
        this.formatTimestamp(entry.timestamp),
        entry.fromRoute,
        entry.toRoute,
        entry.user,
      ])

      let csv = headers.join(',') + '\n'
      rows.forEach((row) => {
        csv += row.map((cell) => `"${cell}"`).join(',') + '\n'
      })

      // Download do ficheiro
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`
      link.click()
      window.URL.revokeObjectURL(url)
    },
  },

  created() {
    this.currentUser = authStore.getUser()
    this.loadAuditTrail()
  },

  mounted() {
    // Recarrega audit trail quando view é montada
    // Útil se utilizador navegar de volta para esta página
    this.loadAuditTrail()
  },
}
</script>

<style scoped>
.analytics-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.subtitle {
  color: var(--text-dark-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.metrics {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.metric-card {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.metric-icon {
  font-size: 3rem;
  color: var(--text-dark-secondary);
}

.metric-content {
  text-align: center;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
  word-wrap: break-word;
}

.metric-label {
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
}

/* Secções de gráficos */
.chart-section {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.chart-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

/* Gráfico de barras simples */
.simple-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 300px;
  gap: 0.5rem;
  padding: 1rem 0;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.bar-fill {
  width: 100%;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  border-radius: 6px 6px 0 0;
  transition: height 0.3s;
  min-height: 20px;
}

.bar-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-dark-secondary);
  font-weight: 600;
}

/* Lista de departamentos */
.department-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.department-item {
  display: grid;
  grid-template-columns: 200px 1fr 80px;
  align-items: center;
  gap: 1rem;
}

.department-name {
  font-weight: 600;
  color: var(--text-dark);
}

.department-bar-container {
  background: var(--divider);
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
}

.department-bar {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  height: 100%;
  border-radius: 15px;
  transition: width 0.3s;
}

.department-count {
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Audit Trail */
.audit-trail {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 12px;
  padding: 2rem;
}

.audit-header {
  margin-bottom: 1.5rem;
}

.audit-header h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.audit-header p {
  color: var(--text-dark-secondary);
}

.audit-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-dark);
}

.filter-group input {
  padding: 0.75rem;
  border: 2px solid var(--divider);
  border-radius: 6px;
  background: var(--bg-soft);
  color: var(--text-dark);
}

.filter-group input:focus {
  outline: none;
  border-color: var(--text-dark-blue);
}

.clear-filters,
.export-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-filters {
  background: var(--bg-soft);
  color: var(--text-dark);
  border: 2px solid var(--divider);
}

.clear-filters:hover {
  background: var(--black-mute);
  border-color: var(--text-dark-blue);
}

.export-button {
  background: #28a745;
  color: white;
}

.export-button:hover {
  background: #218838;
}

.audit-stats {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  background: var(--black-mute);
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.stat {
  color: var(--text-dark);
}

.audit-table-container {
  overflow-x: auto;
}

.audit-table {
  width: 100%;
  border-collapse: collapse;
}

.audit-table thead {
  background: var(--black-mute);
}

.audit-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-dark);
  border-bottom: 2px solid var(--divider);
}

.audit-table td {
  padding: 1rem;
  color: var(--text-dark);
  border-bottom: 1px solid var(--divider);
}

.audit-table tbody tr:hover {
  background: var(--black-mute);
}

.route-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: 1px solid var(--divider);
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--divider);
}

.pagination-button {
  padding: 0.75rem 1.5rem;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.pagination-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.pagination-button:disabled {
  background: var(--divider);
  color: var(--text-dark-secondary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pagination-info {
  font-weight: 600;
  color: var(--text-dark);
}

.no-data {
  text-align: center;
  padding: 3rem;
  color: var(--text-dark-secondary);
}

.no-data .hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--yellow);
}
</style>
