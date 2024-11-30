<template>
  <!-- Header -->
  <header
    :class="[
      'h-16 px-4 fixed right-0 left-0 z-20 items-center flex w-full',
      containerClass,
    ]"
  >
    <div class="flex justify-between items-center w-full">
      <!-- Logo -->
      <div class="font-semibold h-8 w-fit flex items-center">
        <RouterLink to="/">
          <div class="flex gap-2 items-center mx-1">
            <div
              class="bg-white h-12 w-12 rounded-full border border-primary"
            ></div>
          </div>
        </RouterLink>
      </div>

      <!-- Burger Menu Button (Visible on Small Screens) -->
      <button
        @click="handleOpeningMenu"
        :class="[
          'md:hidden focus:outline-none ',
          { 'text-gray-700': scrollYPosition > 10 },
          { 'text-white': scrollYPosition < 10 },
        ]"
      >
        <font-awesome-icon icon="fa-solid fa-bars" class="h-6 w-6" />
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
            :class="['md:hidden text-gray-700 focus:outline-none']"
          >
            <font-awesome-icon icon="fa-solid fa-times" class="h-6 w-6" />
          </button>
        </div>

        <RouterLink
          v-for="link in routerLinks"
          :key="link.name"
          :to="link.to"
          :class="[
            '!mx-4 uppercase tracking-[.25rem] block md:inline',
            { 'font-bold': link.selected },
            linkClass,
          ]"
          @click="handleClosingMenu"
        >
          {{ link.name }}
        </RouterLink>
        <a
          href="https://www.instagram.com/soycuidador/"
          :class="[
            'block md:inline !mx-4 uppercase tracking-[.25rem]',
            linkClass,
          ]"
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
import useScrollYPosition from "../composables/useScrollYPosition";

const route = useRoute();
const isMenuOpen = ref(false);
const routerLinks = computed(() => [
  { name: "Inicio", to: "/home", selected: route.name === "home" },
  { name: "Blog", to: "/blog", selected: route.name === "blog" },
  { name: "Contacto", to: "/contacto", selected: route.name === "contact" },
]);

// Get scrollYPosition directly from the composable
const { scrollYPosition } = useScrollYPosition();

const containerClass = computed(() => {
  return (
    {
      home: {
        "bg-white shadow-lg": scrollYPosition.value > 10,
        "bg-transparent": scrollYPosition.value <= 10,
      },
    }[route.name] || "bg-white"
  );
});

const linkClass = computed(() => {
  return (
    {
      home: {
        "text-gray-700": scrollYPosition.value > 10,
        "text-gray-700 md:text-white": scrollYPosition.value <= 10,
      },
    }[route.name] || "text-gray-700"
  );
});

const burgerMenuClass = computed(() => {
  return (
    {
      home: {
        "text-gray-700": scrollYPosition.value > 10,
        "text-white": scrollYPosition.value <= 10,
      },
    }[route.name] || "text-gray-700"
  );
});

function handleClosingMenu() {
  isMenuOpen.value = false;
}

function handleOpeningMenu() {
  isMenuOpen.value = true;
}

</script>

<style lang="postcss" scoped>
@media only screen and (min-width: 90rem) {
  header {
    @apply flex items-center justify-center px-8;
    > div {
      width: 90rem;
      max-width: 90rem;
    }
  }
}
</style>
