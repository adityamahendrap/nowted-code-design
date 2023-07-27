<script setup>
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

defineProps(['icon'])
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="flex bg-transparent text-white">
      <i :class="icon"></i>
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="absolute right-0 z-50 mt-4 pt-1 py-2 w-18 origin-top-right rounded-md bg-[#333333] focus:outline-none">
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
