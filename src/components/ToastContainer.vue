<template>
  <div class="toast-wrap">
    <div v-for="t in toastStore.toasts" :key="t.id" class="toast" :class="t.type">
      <span>{{ t.type === 'ok' ? '✅' : '❌' }}</span>
      {{ t.msg }}
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()
</script>
