<template>
  <div class="relative">
    <!-- Button to toggle dropdown -->
    <button
      class="z-10 relative flex items-center focus:outline-none select-none"
      @click="toggleDropdown"
    >
      <slot />
    </button>

    <!-- Dropdown menu with transition -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        v-if="isOpen"
        v-on-click-outside="closeDropdown"
        class="absolute rounded-xl mt-3 border border-gray-200 shadow py-2 bg-white -right-[25%]"
        :class="toggleDropdown"
        ref="target"
      >
        <div @click="closeDropdown">
          <slot name="overlay"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";

// State to control dropdown visibility
const isOpen = ref(false);

// Methods to open, close, and toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};
</script>
