<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes';
import { useModalStore } from '@/stores/modal';
import DropdownCustom from '../../DropdownCustom.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const store = useNotesStore()
const modalStore = useModalStore()
const { isModalOpen, modalContent } = storeToRefs(modalStore)
const { folders, foldersWithSort } = storeToRefs(store)

const handleDeleteFolder = (folder) => {
  modalStore.setModal('Confirm', { 
    title: 'Delete Folder',
    description: `Are you sure you want to delete the folder named <b>${folder}</b>? This action will also delete all notes inside this folder` ,
    textBtn: 'Delete',
    btnAction: 'deleteFolder',
    actionParams: { folder }
  })
  modalStore.openModal()
}

const handleCreateFolder = () => {
  modalStore.setModal('Input', { 
    title: 'Create Folder',
    textBtn: 'Create',
    btnAction: 'createFolder',
  })
  modalStore.setModalInput('')
  modalStore.openModal()
}

const handleRenameFolder = (folder) => {
  modalStore.setModal('Input', { 
    title: 'Rename Folder',
    textBtn: 'Rename',
    btnAction: 'renameFolder',
    actionParams: { folder }
  })
  console.log(folder);
  modalStore.setModalInput(folder)
  modalStore.openModal()
}

const menuItemStyle = 'cursor-pointer px-3 py-1 hover:text-white/40 truncate'
const sort = ref({
  az: {
    sortBy: 'name',
    sortType: 0
  },
  za: {
    sortBy: 'name',
    sortType: 1
  },
  newest: {
    sortBy: 'date',
    sortType: 0
  },
  oldest: {
    sortBy: 'date',
    sortType: 1
  },
})

const sortParams = ref({
  sortBy: null,
  sortType: null
})
</script>

<template>
  <section class="mt-6">
    <div class="text-white/60">
      <div class="mb-2 flex justify-between items-center px-6 text-sm">
        <h1>Folders</h1>
        <div class="flex items-center gap-7">
          <div class="cursor-pointer">
            <DropdownCustom :icon="'fa-solid fa-sort text-white/60'">
              <MenuItem 
                @click="sortParams.sortBy = 'name'; sortParams.sortType = 1" 
                :class="menuItemStyle"
              >
                <p>AZ</p>
              </MenuItem>
              <MenuItem 
                @click="sortParams.sortBy = 'name'; sortParams.sortType = 0" 
                :class="menuItemStyle"
              >
                <p>ZA</p>
              </MenuItem>
              <MenuItem 
                @click="sortParams.sortBy = 'date'; sortParams.sortType = 0" 
                :class="menuItemStyle"
              >
                <p>Newest</p>
              </MenuItem>
              <MenuItem 
                @click="sortParams.sortBy = 'date'; sortParams.sortType = 1" 
                :class="menuItemStyle"
              >
                <p>Oldest</p>
              </MenuItem>
            </DropdownCustom>
          </div>
          <div @click="handleCreateFolder()" class="m-auto mr-[2px] cursor-pointer">
            <i class="fa-solid fa-folder-plus text-white/60"></i>
          </div>
        </div>
      </div>
      <div
        v-for="(folder, index) in foldersWithSort(sortParams.sortBy, sortParams.sortType)"
        :key="index"
        @click.self="store.selectFolder(folder.name)"
        class="flex cursor-pointer justify-between gap-6 px-6 py-2"
        :class="folder.isActive ? 'bg-white/5 text-white' : ''"
      >
        <div class="my-auto w-5 h-5 flex-shrink-0">
          <img
            class="w-full h-full"
            :src="
              folder.isActive
                ? 'src/assets/images/folder-active-icon.svg'
                : 'src/assets/images/folder-unactive-icon.svg'
            "
          />
        </div>
        <div
          @click="store.selectFolder(folder.name)"
          class="w-8/12 truncate border-2 border-transparent bg-transparent focus:border-white/60 focus:outline-none"
        >
          {{ folder.name }}
        </div>

        <div @click="handleDeleteFolder(folder.name)" class="w-1/12">
          <i class="fa-regular fa-trash-can text-white/60"></i>
        </div>
          
        <div
          @click="handleRenameFolder(folder.name)"
          class="w-1/12 text-right"
        >
          <i class="fa-solid fa-pen-to-square text-white/60"></i>
        </div>
      </div>
      <h1 v-if="!folders.length" class="text-center text-sm text-white/60">~ Empty ~</h1>
    </div>
  </section>
</template>

<style scoped></style>
