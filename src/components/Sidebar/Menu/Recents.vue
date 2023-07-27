<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes.js';
const store = useNotesStore()

const { recentNotes, activeNote, activeFolder } = storeToRefs(store)
const toggleRecent = ref(true)
const counter = ref(0)
</script>

<template>
  <section>
    <div class="text-white/60">
      <div class="mb-2 px-6 flex justify-between items-center">
        <h1 class="text-sm">Recents</h1>
        <div @click="toggleRecent = !toggleRecent" class="h-max">
          <i 
            :class="toggleRecent ? '' : 'fa-rotate-180'"
            class="fa-solid fa-chevron-up text-white/50 cursor-pointer" 
          ></i>
        </div>
      </div>
      <template v-if="toggleRecent">
        <template 
          v-for="(recent, index) in recentNotes"
          :key="index"
        >
          <div
            v-if="index < 3"
            class="flex cursor-pointer gap-6 px-6 py-2"
            :class="recent.isActive ? 'bg-blue-800 text-white' : ''"
            @click="store.selectNote(recent.title, recent.folder)"
          >
            <div
              class="my-auto w-2/12"
              :class="!recent.isActive ? 'opacity-60' : ''"
            >
              <img src="src/assets/images/document-icon.svg" alt="Document Icon" />
            </div>
            <h1 class="w-full truncate">
              {{ recent.title == "" ? "Untitled Note" : recent.title }}
            </h1>
          </div>
        </template>
        <h1 v-if="!recentNotes.length" class="text-center text-sm text-white/60">~ Empty ~</h1>
      </template>
    </div>
  </section>
</template>

<style scoped></style>
