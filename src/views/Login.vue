<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()

const email = ref('')
const password = ref('')
const isShowPassword = ref(false)
const inputTypeInPassword = ref('password')

const togglePassword = () => {
  isShowPassword.value = !isShowPassword.value
  inputTypeInPassword.value = isShowPassword.value ? 'text' : 'password'
}
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center bg-[#181818]">
    <div class="min-w-[400px]">
      <h1 class="mb-10 text-center text-2xl font-semibold text-white">Hey, do we know each other? 👻</h1>
      <form action="" class="flex flex-col">
        <label class="text-white">
          <i class="fa-solid fa-envelope"></i>
          E-mail
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="Type your email here"
          class="mt-1 w-full border-b-2 border-white/20 bg-transparent py-2 text-white/60 placeholder:text-white/60 focus:outline-none"
        />
        <label class="text-white mt-5">
          <i class="fa-solid fa-lock"></i>
          Password
        </label>
        <div class="flex mt-1 gap-2">
          <input
            v-model="password"
            :type="inputTypeInPassword"
            placeholder="Type your secret password here"
            class="w-full border-b-2 border-white/20 bg-transparent py-2 text-white/60 placeholder:text-white/60 focus:outline-none"
          />
          <button @click.prevent="togglePassword" class="w-[50px] bg-white/5 hover:bg-white/10 rounded-sm px-2">
            <i class="fa-solid" :class="isShowPassword ? 'fa-eye' : 'fa-eye-slash'"></i>
          </button>
        </div>
        <button class="mt-10 text-white font-semibold bg-white/5 rounded-sm py-2 hover:bg-white/10">
          Login
        </button>
      </form>

      <p class="text-white/50 text-center mt-10">
        Doesn't know who you are? 
        <span 
          @click="router.push({ path: '/register' })"
          class="underline cursor-pointer">
          Register
        </span></p>
    </div>
  </div>
</template>

<style scoped></style>
