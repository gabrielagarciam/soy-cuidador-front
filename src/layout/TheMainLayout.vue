<template>
  <div class="flex flex-col min-h-screen main-layout overflow-x-hidden">
    <TheMainLayoutHeaderVue />
    <RouterView />
    <AlertBase />
  </div>
</template>

<script setup>
import TheMainLayoutHeaderVue from "./TheMainLayoutHeader.vue";
import AlertBase from "../components/Base/AlertBase.vue";
import { RouterView } from "vue-router";
import { onMounted, onUnmounted } from "vue";

const updateScreenHeightVar = () => {
  document.documentElement.style.setProperty(
    "--screen-height",
    `${window.innerHeight}px`
  );
};

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenHeightVar);
});

onMounted(() => {
  console.log("gaby was here", window.innerHeight);
  updateScreenHeightVar(); // Set the value on mount
  window.addEventListener("resize", updateScreenHeightVar);
});
</script>
