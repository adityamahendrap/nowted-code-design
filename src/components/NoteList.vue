<script setup>
import { formatDate } from "../utils/utils.js";
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
import DropdownCustom from './DropdownCustom.vue';
import { ref } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const store = useNotesStore()
const { activeFolder, notesInFolder, getActiveMore, favorites, foldersWithSort } = storeToRefs(store)

const menuItemStyle = 'cursor-pointer px-3 py-1 hover:text-white/40 truncate'
const sortParams = ref({
  sortBy: null,
  sortType: null
})

</script>

<template>
  <main class="overflow-y-scroll overflow-x-auto hide-scrollbar h-full px-6 py-8">
    <!-- notes in folder -->
    <template v-if="activeFolder.length">
      <div class="mb-8 flex justify-between items-center gap-5">
        <h1 class="text-xl font-semibold truncate">{{ activeFolder[0].name }}</h1>
        <div class="cursor-pointer">
          <DropdownCustom :icon="'fa-solid fa-sort text-white/60'">
            <MenuItem 
              @click="sortParams.sortBy = 'title'; sortParams.sortType = 1" 
              :class="menuItemStyle"
            >
              <p class="text-sm">AZ</p>
            </MenuItem>
            <MenuItem 
              @click="sortParams.sortBy = 'title'; sortParams.sortType = 0" 
              :class="menuItemStyle"
            >
              <p class="text-sm">ZA</p>
            </MenuItem>
            <MenuItem 
              @click="sortParams.sortBy = 'date'; sortParams.sortType = 0" 
              :class="menuItemStyle"
            >
              <p class="text-sm">Newest</p>
            </MenuItem>
            <MenuItem 
              @click="sortParams.sortBy = 'date'; sortParams.sortType = 1" 
              :class="menuItemStyle"
            >
              <p class="text-sm">Oldest</p>
            </MenuItem>
          </DropdownCustom>
        </div>
      </div>
      <div v-for="(note, index) in notesInFolder(activeFolder[0]?.name, sortParams.sortBy, sortParams.sortType)" :key="index">
        <div
          @click="store.selectNote(note.title, note.folder)"
          class="my-5 cursor-pointer rounded-sm p-5"
          :class="note.isActive ? 'bg-white/20' : 'bg-white/5'"
        >
          <div class="mb-1 line-clamp-1">
            {{ note.title == "" ? "Untitled Note" : note.title }}
          </div>
          <div class="flex gap-2">
            <div class="text-white/40">{{ formatDate(note.date) }}</div>
            <div class="truncate text-white/60">{{ note.content }}</div>
          </div>
        </div>
      </div>
      <div v-if="!notesInFolder(activeFolder[0]?.name, 'title', 0).length">
        <div class="mt-[280px] flex h-full flex-col items-center justify-center">
          <i class="fa-brands fa-fly fa-2xl"></i>
          <h1 class="mt-6 max-w-[200px] text-center text-white opacity-50">
            Empty Folder
          </h1>
        </div>
      </div>
    </template>
    
    <template v-else-if="getActiveMore == 'Favorites'">
      <h1 class="mb-8 text-xl font-semibold">Favorites</h1>
      <div v-for="(note, index) in favorites" :key="index">
        <div
          @click="store.selectFavoriteNote(note.title)"
          class="my-5 cursor-pointer rounded-sm p-5"
          :class="note.isActive ? 'bg-white/20' : 'bg-white/5'"
        >
          <div class="mb-1 line-clamp-1">
            {{ note.title == "" ? "Untitled Note" : note.title }}
          </div>
          <div class="flex gap-2">
            <div class="text-white/40">{{ formatDate(note.date) }}</div>
            <div class="truncate text-white/60">{{ note.content }}</div>
          </div>
        </div>
      </div>
      <div v-if="!favorites.length">
        <div class="mt-[280px] flex h-full flex-col items-center justify-center">
          <i class="fa-solid fa-cube fa-2xl"></i>
          <h1 class="mt-6 max-w-[200px] text-center text-white opacity-50">
            You doesn't have favorite note
          </h1>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex h-full flex-col items-center justify-center">
        <div>
          <i class="fa-solid fa-lemon fa-2xl"></i>
        </div>
        <h1 class="mt-2 max-w-[200px] text-center text-white opacity-50">
          Select a folder to view note list
        </h1>
      </div>
    </template>
  </main>
</template>

<style scoped>
main {
  color: white;
  background-color: #1c1c1c;
  width: 500px;
  height: 100vh;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
