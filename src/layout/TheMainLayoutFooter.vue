<template>
  <!-- Footer -->
  <footer class="bg-white-300  py-3 text-center">
    <p class="text-black/95">&copy; {{ dateformatted }} Thais Madero. All rights reserved.</p>
  </footer>
</template>

<script setup>
import { useDateFormat, useNow } from "@vueuse/core";
import { computed } from "vue";
const dateformatted = computed(() => useDateFormat(useNow(), "YYYY"));
</script>

<style lang="scss" scoped></style>
