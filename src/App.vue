<template>
  <div  class="main-app-container w-full h-full">
    <RouterView />
    <SpeedInsights/>
    <Analytics />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { SpeedInsights } from "@vercel/speed-insights/vue"
import { Analytics } from "@vercel/analytics/vue";
</script>

<style lang="scss" scoped></style>
