<script setup>
import DropdownEllipsis from "./DropdownEllipsis.vue";
import Dropdown from "./Dropdown.vue";
import { formatDate } from "../utils/utils.js";
import { storeToRefs } from 'pinia';
import { useNotesStore } from '@/stores/notes.js';

const store = useNotesStore()
const { activeNote } = storeToRefs(store)
</script>

<script>
import { mapStores, mapState } from 'pinia';

export default {
  computed: {
    ...mapStores(useNotesStore),
    ...mapState(useNotesStore, ['activeNote']),
  },
  methods: {
    resize() {
      let element = this.$refs["textarea"];

      if (element instanceof HTMLTextAreaElement) {
        element.style.height = "18px";
        element.style.height = element.scrollHeight + "px";
      }
    },
  },
  watch: {
    activeNote() {
      this.$nextTick(() => {
        this.resize();
      });
    }
  }
}
</script>

<template>
  <main class="w-full overflow-y-scroll hide-scrollbar">
    <template v-if="activeNote.length">
      <section class="px-12 py-14">
        <div class="flex justify-between">
          <input
            type="text"
            maxlength="50"
            class="w-full bg-transparent pr-10 text-3xl font-semibold focus:outline-none"
            placeholder="Note Title"
            v-model="activeNote[0].title"
            @input="store.changeNoteTitle(activeNote[0].date, activeNote[0].title)"
          />
          <div>
            <DropdownEllipsis/>
          </div>
        </div>
        <div class="mt-8 flex">
          <div class="my-auto mr-4">
            <img src="src/assets/images/date-icon.svg" alt="Date Icon" />
          </div>
          <div class="w-32 text-white/60">Date</div>
          <div class="relative">
            <div class="underline">
              {{ formatDate(activeNote[0].date) }}
            </div>
          </div>
        </div>
        <hr class="mt-4 opacity-10" />
        <div class="mt-4 flex">
          <div class="my-auto mr-4">
            <img
              src="src/assets/images/folder-unactive-icon.svg"
              alt="Folder Icon"
            />
          </div>
          <div class="w-32 text-white/60">Folder</div>
          <Dropdown 
            :folderName="activeNote[0].folder"
            :noteTitle="activeNote[0].title"
          />
        </div>
        <textarea 
          ref="textarea"
          class="mt-8 w-full bg-transparent focus:outline-none"
          v-model="activeNote[0].content"
          @input="resize(); store.changeNoteContent(activeNote[0].date, activeNote[0].content)"
          placeholder="Type something here..."
        ></textarea>
      </section>
    </template>
    <template v-else>
      <section class="flex h-full items-center justify-center px-12 py-14">
        <div class="flex flex-col items-center justify-center text-center">
          <div><img src="src/assets/images/note.svg" /></div>
          <h1 class="mt-3 text-2xl font-semibold">Select a note to view</h1>
          <p class="mt-3 max-w-lg text-white/50">
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
main {
  color: white;
  background-color: #181818;
  height: 100vh;
}

textarea {
  resize: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
