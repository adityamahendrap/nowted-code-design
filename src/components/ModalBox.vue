<script setup>
  import { ref } from 'vue';
  import Button from './Button.vue';

  const name = ref('')
  defineProps(['vModel', 'changeFolderName'])

</script>

<template>
  <div class="absolute inset-0 flex justify-center items-center text-white bg-black/50">
    <div class="bg-[#181818] p-8 rounded-md">
      <h1 class="text-center">New {}</h1>
      <input type="text" v-model="name" class="bg-transparent py-2 px-2 mt-4 outline-none border-b border-b-white/50" placeholder="Enter {} name">
      <Button text="Create" class="mt-8"/>
    </div>
  </div>
</template>

<style scoped></style>