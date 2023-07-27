<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const toMainPage = () => {
  router.push({ path: '/' })
}
</script>

<template>
  <main class="w-full py-12 bg-[#181818]">
    <div class="text-center">
      <h1 class="font-semibold">Oof, looks like you got lost</h1>
      <hr class="mx-auto mt-2 max-w-md" />
      <button
        @click="toMainPage"
        class="mt-2 rounded-md bg-black/10 px-3 py-1 hover:opacity-80"
      >
        Go to main page
      </button>
    </div>
  </main>
</template>

<style scoped></style>
