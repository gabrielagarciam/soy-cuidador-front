<template>
  <div
    class="bg-[#f9f4f2] rounded-lg shadow-md py-6 px-4 cursor-pointer flex flex-col justify-between skeleton-animation h-56"
  />
</template>

<script setup></script>

<style lang="postcss" scoped>
.skeleton-animation {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite ease-in-out;
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
