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
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from "vue";
import useScreenHeight from "../composables/useScreenHeight";

onMounted(() => {
  useScreenHeight().subscribeResizeEvent();
});

onBeforeUnmount(() => {
  useScreenHeight().unsubscribeResizeEvent();
});
</script>
