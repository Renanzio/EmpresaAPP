import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),

  actions: {
    addToast(msg, type = 'ok') {
      const id = Date.now()
      this.toasts.push({ id, msg, type })
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id)
      }, 4000)
    },

    removeToast(id) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
})
