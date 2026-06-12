import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    setUser(user) {
      this.user = user
    },

    clearUser() {
      this.user = null
    },

    setLoading(value) {
      this.loading = value
    }
  }
})