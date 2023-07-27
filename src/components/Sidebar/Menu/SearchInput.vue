<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
const store = useNotesStore()
const { filterNotesByTitle } = storeToRefs(store)

const search = ref('');

const handleSelectNoteInSearchResult = (title, folder) => {
  store.selectNote(title, folder)
  store.resetMore()
  search.value = ''
}
</script>

<template>
  <div class="relative">
    <input
      v-model="search"
      class="w-full border-b-2 border-white/20 bg-transparent py-2 text-white/60 placeholder:text-white/60 focus:outline-none"
      type="text"
      placeholder="Search anything here..."
    />
    <ul class="absolute z-50 mt-2 overflow-hidden rounded-lg bg-[#1c1c1c] py-2">
      <template v-for="note in filterNotesByTitle(search)" :key="note.date">
        <li
          @click="handleSelectNoteInSearchResult(note.title, note.folder)"
          class="min-w-[200px] cursor-pointer overflow-hidden bg-[#1c1c1c] px-4 py-1 text-white/50 hover:text-white/70"
        >
          {{ note.title }}
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped></style>
