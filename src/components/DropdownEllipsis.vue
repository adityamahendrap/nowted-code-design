<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
import { useModalStore } from '@/stores/modal';
const store = useNotesStore()
const modalStore = useModalStore()
const { isNoteFavorited, activeNote } = storeToRefs(store)

const handleDeleteNote = (title, folder) => {
  modalStore.setModal('Confirm', { 
    title: 'Delete Note',
    description: `Are you sure want to delete <b>${title}</b> in folder <b>${folder}</b>? This action will permanently delete the note.` ,
    textBtn: 'Delete',
    btnAction: 'deleteNote',
    actionParams: { title, folder }
  })
  modalStore.openModal()
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="flex bg-transparent text-white underline">
      <img src="/src/assets/images/ellipsis-icon.svg" alt="Ellipsis Icon" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-4 w-max origin-top-right rounded-md bg-[#333333] focus:outline-none"
      >
        <MenuItem
          @click="store.toggleFavorite(activeNote[0].title)"
          class="cursor-pointer px-3 py-2"
        >
          <div class="row flex gap-x-2 hover:text-white/40">
            <img
              src="/src/assets/images/favorites-white-icon.svg"
              class="row-img"
            />
            {{ isNoteFavorited(activeNote[0].title) ? 'Unfavorite' : 'Add to favorites' }}
          </div>
        </MenuItem>
        <MenuItem
          @click="handleDeleteNote(activeNote[0].title, activeNote[0].folder)"
          class="cursor-pointer px-3 py-2"
        >
          <div class="row flex gap-x-2 hover:text-white/40">
            <img src="/src/assets/images/trash-white-icon.svg" class="row-img" />
            Delete
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped>
.row:hover .row-img {
  opacity: 50%;
}
</style>
