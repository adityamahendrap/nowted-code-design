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
          <button
            v-if="index < 3"
            class="flex gap-6 px-6 w-full py-2"
            :class="recent.isActive ? 'bg-blue-800 text-white' : ''"
            @click="store.selectNote(recent.title, recent.folder)"
          >
            <div
              class="my-auto w-5 h-5 flex-shrink-0"
              :class="!recent.isActive ? 'opacity-60' : ''"
            >
              <img class="w-full h-full" src="src/assets/images/document-icon.svg" alt="Document Icon" />
            </div>
            <h1 class="truncate">
              {{ recent.title == "" ? "Untitled Note" : recent.title }}
            </h1>
          </button>
        </template>
        <h1 v-if="!recentNotes.length" class="text-center text-sm text-white/60">~ Empty ~</h1>
      </template>
    </div>
  </section>
</template>

<style scoped></style>
