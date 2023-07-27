<script setup>
import { ref } from 'vue';
import Button from "../../Button.vue";
import SearchInput from "../Menu/SearchInput.vue";

const isSearch = ref(false)
const searchToggle = () => (isSearch.value = isSearch.value ? false : true);

import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
import { useModalStore } from '@/stores/modal';
const store = useNotesStore()
const modalStore = useModalStore()
const { activeFolder, isAddNoteButton } = storeToRefs(store)

const handleCreateNote = (folder) => {
  modalStore.setModal('Input', { 
    title: `Create Note on Folder <b>${folder}</b>`,
    textBtn: 'Create',
    btnAction: 'createNote',
  })
  modalStore.setModalInput('')
  modalStore.openModal()
}
</script>

<template>
  <section class="px-6 py-8">
    <div class="flex justify-between">
      <div>
        <img
          class="hover:cursor-pointer"
          src="src/assets/images/nowted-logo.svg"
          alt="Nowted"
        />
      </div>
      <div class="my-auto">
        <img
          class="cursor-pointer"
          src="src/assets/images/search-icon.svg"
          alt="Search Icon"
          @click="searchToggle"
        />
      </div>
    </div>
    <SearchInput class="mt-3" v-if="isSearch" />
    <Button @click="handleCreateNote(activeFolder[0].name)" :condition="isAddNoteButton" text="New Note" color="gray" position="center" />
  </section>
</template>

<style scoped></style>
