<script setup>
defineProps(["condition", "color", "position", "text"]);

const variants = {
  color: {
    gray: "bg-white/5",
  },
  position: {
    center: "justify-center",
    right: "justify-end",
  },
};
</script>

<template>
  <button
    class="mt-5 flex w-full gap-2 rounded-sm py-3"
    :disabled="!condition"
    :class="`${condition ? 'cursor-pointer' : 'cursor-not-allowed opacity-20'}
             ${variants.color['gray']}
             ${variants.position['center']}`"
  >
    <div class="my-auto">
      <img src="/src/assets/images/plus-icon.svg" alt="Plus Icon" />
    </div>
    <span>{{ text }}</span>
  </button>
</template>

<style scoped></style>
