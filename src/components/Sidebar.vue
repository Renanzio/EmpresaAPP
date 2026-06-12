<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">👥</span>
        <span class="logo-text">RH Central</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Filtrar por cargo</div>
      <button
        v-for="r in rolesList"
        :key="r.key"
        class="nav-item"
        :class="{ active: activeRole === r.key }"
        @click="activeRole = r.key"
      >
        <span class="nav-icon">{{ r.icon }}</span>
        <span class="nav-label">{{ r.label }}</span>
        <span class="nav-count">{{ countByRole(r.key) }}</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: activeRole === 'Todos' }"
        @click="activeRole = 'Todos'"
      >
        <span class="nav-icon">📋</span>
        <span class="nav-label">Todos</span>
        <span class="nav-count">{{ employees.length }}</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">{{ userInitial }}</div>
        <div class="user-email">{{ currentUser?.email || 'Usuário' }}</div>
      </div>
      <button class="btn btn-ghost btn-sm logout-btn" @click="logout">
        Sair
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useAuthStore } from '@/stores/authStore'

const employeeStore = useEmployeeStore()
const authStore = useAuthStore()

const employees = computed(() => employeeStore.employees)

const activeRole = computed({
  get: () => employeeStore.selectedRole,
  set: (value) => {
    employeeStore.selectedRole = value
  }
})

const rolesList = [
  { key: 'Gerente', label: 'Gerentes', icon: '👔' },
  { key: 'Analista', label: 'Analistas', icon: '📊' },
  { key: 'Assistente', label: 'Assistentes', icon: '📝' }
]

function countByRole(role) {
  return employees.value.filter(employee => employee.role === role).length
}

const currentUser = computed(() => authStore.user)

const userInitial = computed(() => {
  return currentUser.value?.email?.charAt(0)?.toUpperCase() || '?'
})

function logout() {
  authStore.clearUser()
}
</script>
