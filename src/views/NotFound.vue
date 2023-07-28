<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const toMainPage = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <main class="w-full h-screen py-12 bg-[#181818]">
    <div class="text-center">
      <h1 class="font-semibold">Oof, looks like you got lost</h1>
      <hr class="mx-auto mt-2 max-w-md border-white/50" />
      <button
        @click="toMainPage"
        class="mt-2 rounded-md bg-[#242424] hover:bg-white/10 px-3 pt-1 pb-2"
      >
        Go to main page
      </button>
    </div>
  </main>
</template>

<style scoped></style>
