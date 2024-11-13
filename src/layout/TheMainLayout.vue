<template>
  <div class="flex flex-col min-h-screen main-layout">
    <!-- Header -->

    <TheMainLayoutHeaderVue
      class="w-full fixed top-0 left-0 z-10 p-4 shadow bg-white"
    />

    <!-- Main content -->
    <div class="flex-grow mx-auto px-4 pt-20 pb-10">
      <RouterView />
    </div>

    <!-- Footer -->
    <TheMainLayoutFooterVue class="w-full bottom-0 left-0 p-4" />
  </div>
</template>

<script setup>
import TheMainLayoutHeaderVue from "./TheMainLayoutHeader.vue";
import TheMainLayoutContentVue from "./TheMainLayoutContent.vue";
import TheMainLayoutFooterVue from "./TheMainLayoutFooter.vue";
import { RouterView } from "vue-router";
</script>

<style lang="postcss" scoped>
.main-layout {
  /* Extra small devices (phones, 600px and down) */
  /* @media only screen and (max-width: 600px) {...} */
  /* Small devices (portrait tablets and large phones, 600px and up) */

  /* Medium devices (landscape tablets, 768px and up) */
  /* @media only screen and (min-width: 768px) {...} */
  /* Large devices (laptops/desktops, 992px and up) */
  /* @media only screen and (min-width: 992px) {...} */
  /* Extra large devices (large laptops and desktops, 1200px and up) */
  /* @media only screen and (min-width: 1200px) {...} */
}

@media only screen and (max-width: 600px) {
  .main-layout {
    @apply p-4;
  }
}
</style>
