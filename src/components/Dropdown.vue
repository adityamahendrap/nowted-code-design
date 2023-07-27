<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const props = defineProps(['folderName', 'noteTitle'])
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
const store = useNotesStore()
const { folders } = storeToRefs(store)
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="flex bg-transparent text-white underline w-48">
      <p class="truncate">{{ folderName }}</p>
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="absolute left-0 z-10 mt-4 pt-1 py-2 w-36 origin-top-right rounded-md bg-[#333333] focus:outline-none">
        <template 
          v-for="(folder, index) in folders" 
          :key="index"
        >
          <MenuItem @click="store.changeNoteFolder(noteTitle, folder.name)" class="cursor-pointer px-3 py-1 hover:text-white/40 truncate">
            <p>{{ folder.name }}</p>
          </MenuItem>
        </template>
      </MenuItems>
    </transition>
  </Menu>
</template>
