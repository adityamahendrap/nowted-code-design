<script setup>
  import Header from './Header.vue';
  import Recent from './Recents.vue';
  import Folders from './Folders.vue';
  import More from './More.vue';
</script>

<template>
  <main class="overflow-y-scroll hide-scrollbar w-full">
    <Header/>
    <Recent/>
    <Folders/>
    <More/>
  </main>
</template>

<style scoped>
  main {
    color: white;
    background-color: #181818;
    width: 500px;
    height: 100vh;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
</style>