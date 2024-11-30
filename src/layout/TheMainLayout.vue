<template>
  <div class="flex flex-col min-h-screen main-layout overflow-x-hidden">
    <TheMainLayoutHeaderVue />
    <RouterView />
    <AlertBase />
  </div>
</template>

<script setup>
import TheMainLayoutHeaderVue from "./TheMainLayoutHeader.vue";
import TheMainLayoutFooterVue from "./TheMainLayoutFooter.vue";
import AlertBase from "../components/Base/AlertBase.vue";
import { RouterView } from "vue-router";
</script>
