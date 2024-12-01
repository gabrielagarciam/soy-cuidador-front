<template>
  <div  class="main-app-container">
    <RouterView />
    <SpeedInsights/>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>

<style lang="scss" scoped></style>
