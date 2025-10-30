<template>
  <div class="overview">
    <!-- Cards com estatísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-info">
          <h3>Total Users</h3>
          <p class="stat-value">{{ stats.total }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Active Users</h3>
          <p class="stat-value">{{ stats.active }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Inactive Users</h3>
          <p class="stat-value">{{ stats.inactive }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-info">
          <h3>Administrators</h3>
          <p class="stat-value">{{ stats.administrators }}</p>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="actions-grid">
        <RouterLink to="/dashboard/users" class="action-card">
          <h3>Manage Users</h3>
          <p>View and edit user accounts</p>
        </RouterLink>

        <RouterLink to="/dashboard/settings" class="action-card">
          <h3>System Settings</h3>
          <p>Configure application settings</p>
        </RouterLink>
      </div>
    </div>

  
  </div>
</template>

<script>
import { getUserStats } from '@/data/users.js'

export default {
  name: 'OverviewView',
  data() {
    return {
      stats: getUserStats(),
    }
  },
}
</script>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  color: var(--text-dark-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: var(--text-dark);
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

/* Quick actions */
.quick-actions h2 {
  margin-bottom: 1rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
}

.action-card:hover {
  background-color: var(--black-muted);
}

.action-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.action-card h3 {
  color: var(--green);
}

.action-card p {
  color: var(--text-dark);
  margin: 0;
}

</style>
