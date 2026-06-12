import { defineStore } from 'pinia'
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployeeById
} from '@/services/employeeService'

export const useEmployeeStore = defineStore('employees', {
  state: () => ({
    employees: [],
    loading: false,
    selectedRole: 'Todos',
    searchTerm: ''
  }),

  getters: {
    filteredEmployees(state) {
      return state.employees.filter(employee => {
        const matchRole =
          state.selectedRole === 'Todos' ||
          employee.role === state.selectedRole

        const matchSearch =
          employee.name
            ?.toLowerCase()
            .includes(state.searchTerm.toLowerCase())

        return matchRole && matchSearch
      })
    },

    totalEmployees(state) {
      return state.employees.length
    }
  },

  actions: {
    async loadEmployees() {
      this.loading = true

      try {
        this.employees = await getEmployees()
      } finally {
        this.loading = false
      }
    },

    async addEmployee(employee) {
      await createEmployee(employee)
      await this.loadEmployees()
    },

    async editEmployee(id, employee) {
      await updateEmployee(id, employee)
      await this.loadEmployees()
    },

    async removeEmployee(id) {
      await deleteEmployeeById(id)
      await this.loadEmployees()
    }
  }
})