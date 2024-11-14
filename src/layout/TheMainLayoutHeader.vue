<template>
  <!-- Header -->
  <header class="bg-white md:px-12 md:pt-20 md:pb-4">
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <div class="font-semibold text-xl md:text-4xl">
        <RouterLink to="/">Soy Cuidador</RouterLink>
      </div>

      <!-- Burger Menu Button (Visible on Small Screens) -->
      <button
        @click="handleOpeningMenu"
        class="md:hidden text-gray-800 focus:outline-none"
      >
        <!-- Icon for burger menu -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <!-- Navigation Links -->
      <nav
        :class="[
          'fixed inset-y-0 right-0  bg-white  transform transition-transform duration-300 md:static md:w-auto md:bg-transparent md:shadow-none md:transform-none',
          isMenuOpen ? 'translate-x-0 w-full' : 'translate-x-full',
        ]"
        class="space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0"
      >
        <div class="w-full flex justify-end md:hidden">
          <!-- Button for close burger menu -->
          <button
            @click="handleClosingMenu"
            class="md:hidden text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <RouterLink
          v-for="link in routerLinks"
          :key="link.name"
          :to="link.to"
          :class="['hover:text-gray-700 !mx-4 uppercase tracking-[.25rem]', { 'font-bold': link.selected }]"
          class="block md:inline"
          @click="handleClosingMenu"
        >
          {{ link.name }}
        </RouterLink>
        <a
          href="https://www.instagram.com/soycuidador/"
          class="hover:text-gray-700 block md:inline !mx-4 uppercase tracking-[.25rem]"
          target="_blank"
          @click="handleClosingMenu"
        >
          Instagram
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);
const routerLinks = computed(() => [
  { name: "About", to: "/about", selected: route.name === "about" },
  { name: "Blog", to: "/blog", selected: route.name === "blog" },
  { name: "Contact", to: "/contact", selected: route.name === "contact" },
]);

function handleClosingMenu() {
  isMenuOpen.value = false;
}

function handleOpeningMenu() {
  isMenuOpen.value = true;
}
</script>
