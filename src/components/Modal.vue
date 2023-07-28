<script setup>
import { ref, watch } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useNotesStore } from '@/stores/notes';
const store = useNotesStore()
const modalStore = useModalStore()
const { activeFolder } = storeToRefs(store)
const { isModalOpen, modalContent, modalType, modalBtnAction, modalActionParams, getModalInput } = storeToRefs(modalStore)

const localInput = ref('')

watch(getModalInput, (newModalInput) => {
  localInput.value = newModalInput
})

const handleBtnAction = () => {
  if(modalBtnAction.value == 'deleteFolder') {
    store.deleteFolder(modalActionParams.value.folder)
  }
  if(modalBtnAction.value == 'deleteNote') {
    store.deleteNote(modalActionParams.value.title, modalActionParams.value.folder)
  }
  if(modalBtnAction.value == 'createFolder') {
    if(localInput.value.trim() == '') return alert('Folder should contain atleast 1 character')
    store.createFolder(localInput.value)
    localInput.value = ''
  }
  if(modalBtnAction.value == 'renameFolder') {
    if(localInput.value.trim() == '') return alert('Folder should contain atleast 1 character')
    store.renameFolder(modalActionParams.value.folder, localInput.value)
    localInput.value = ''
  }
  if(modalBtnAction.value == 'createNote') {
    if(localInput.value.trim() == '') return alert('Note title should contain atleast 1 character')
    store.createNote(localInput.value, activeFolder.value[0].name)
    localInput.value = ''
  }
  modalStore.closeModal()
}
</script>

<template>
  <TransitionRoot v-if="modalType == 'Confirm'" appear :show="isModalOpen" as="div">
    <Dialog as="div" @close="modalStore.closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#181818] p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-white"
                >
                  <h1 v-html="modalContent.title"></h1>
                </DialogTitle>
                <div class="mt-2">
                  <p v-html="modalContent.description" class="text-sm text-white/50"></p>
                </div>
  
                <div class="mt-4 flex justify-center">
                  <button
                    type="button"
                    class="inline-flex justify-center focus:outline-none rounded-md border border-transparent bg-[#242424] px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                    @click="handleBtnAction()"
                  >
                    {{ modalContent.textBtn }}
                  </button>
                </div>
              </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <TransitionRoot v-if="modalType == 'Input'"  appear :show="isModalOpen" as="div">
    <Dialog as="div" @close="modalStore.closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#181818] p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-white"
                >
                  <h1 v-html="modalContent.title"></h1>
                </DialogTitle>
                <div class="mt-2">
                  <input 
                    v-model="localInput"
                    type="text"
                    class="mt-2 w-full border-b-2 border-white/20 bg-transparent py-2 text-white/60 placeholder:text-white/60 focus:outline-none"  
                    placeholder="Type here..."
                    @keydown.enter="handleBtnAction()"
                  >
                </div>
  
                <div class="mt-4 flex justify-center">
                  <button
                    type="button"
                    class="inline-flex justify-center focus:outline-none rounded-md border border-transparent bg-[#242424] px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
                    @click="handleBtnAction()"
                  >
                    {{ modalContent.textBtn }} 
                  </button>
                </div>
              </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
