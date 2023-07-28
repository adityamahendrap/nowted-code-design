<script setup>
const more = ref([
  {
    name: "Favorites",
    isActive: false,
    icon: "/src/assets/Images/favorites-icon.svg",
  },
  {
    name: "Trash",
    isActive: false,
    icon: "/src/assets/Images/trash-icon.svg",
  },
  {
    name: "Archived Notes",
    isActive: false,
    icon: "/src/assets/Images/archived-notes-icon.svg",
  },
]);

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useNotesStore } from "@/stores/notes";
const store = useNotesStore();

const { getActiveMore } = storeToRefs(store);
const toggleMore = ref(true)
</script>

<template>
  <section class="mt-6">
    <div class="text-white/60">
      <div class="mb-2 px-6 flex justify-between items-center">
        <h1 class="text-sm">More</h1>
        <div @click="toggleMore = !toggleMore" class="h-max">
          <i 
            :class="toggleMore ? '' : 'fa-rotate-180'"
            class="fa-solid fa-chevron-up text-white/50 cursor-pointer" 
          ></i>
        </div>
      </div>
      <template v-if="toggleMore">
        <button
          v-for="(e, index) in more"
          :key="index"
          @click="store.setActiveMore(e.name)"
          :disabled="!['Favorites'].includes(e.name)"
          class="flex w-full gap-6 px-6 py-2"
          :class="
            getActiveMore == e.name
              ? 'cursor-pointer bg-white/5 text-white '
              : ['Favorites'].includes(e.name)
              ? 'cursor-pointer'
              : 'cursor-not-allowed opacity-50'
          "
        >
          <div class="my-auto"><img :src="e.icon" /></div>
          <div class="line-clamp-1">{{ e.name }}</div>
        </button>
      </template>
    </div>
  </section>
</template>

<style scoped></style>
