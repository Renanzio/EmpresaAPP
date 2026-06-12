<template>
  <div class="auth-container">

    <h1>RH Central</h1>

    <form @submit.prevent="submit">

      <input
        v-model="email"
        type="email"
        placeholder="E-mail"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Senha"
      />

      <button type="submit">
        {{ registerMode ? 'Cadastrar' : 'Entrar' }}
      </button>

      <button
        type="button"
        @click="registerMode = !registerMode"
      >
        {{ registerMode ? 'Já tenho conta' : 'Criar conta' }}
      </button>

    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '@/services/authService'

const router = useRouter()

const email = ref('')
const password = ref('')
const registerMode = ref(false)

async function submit() {

  if (registerMode.value) {
    await register(email.value, password.value)
  } else {
    await login(email.value, password.value)
  }

  router.push('/dashboard')
}
</script>