<template>
  <div class="main-layout">
    <TheMainLayoutHeaderVue class="main-layout__header" />
    <TheMainLayoutContentVue class="main-layout__content">
      <!-- <RouterView /> -->
    </TheMainLayoutContentVue>
    <TheMainLayoutFooterVue class="main-layout__footer" />
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
  @apply py-10 px-14 grid grid-flow-row h-screen w-screen overflow-x-hidden;
  grid-template-rows: 3rem 1fr 3rem;
  scrollbar-width: thin;
  scrollbar-color: #aaaaaa5d transparent;

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
  .main-layout{

    @apply p-4
  }
}
</style>
