<script setup>
  import Menu from '../components/Sidebar/Menu/Menu.vue';
  import NoteList from '../components/NoteList.vue';
  import Note from '../components/Note.vue';
  import Modal from '../components/Modal.vue';
</script>

<template>
  <div class="bg-[#181818] lg:hidden flex flex-col text-white h-screen w-full justify-center items-center">
    <h1 class="text-2xl font-semibold italic">Coming soon</h1> <br>
    <p class="text-white/50 mt-2">This website currently only has a desktop view <span class="text-white">😶‍🌫️</span></p>
  </div>
  <div class="hidden lg:flex">
    <Menu class="w-2/12"/>
    <NoteList class="w-2/12"/>
    <Note class="w-8/12"/>
  </div>
  <Modal/>
</template>
