<template>
  <div class="mb-4 px-2 w-full">
    <label class="block mb-1 text-sm text-black/85" for="textarea1">{{ label }}</label>

    <textarea
      id="textarea1"
      class="w-full border border-black/10 px-4 py-2 rounded  focus:border-primary focus:shadow-outline outline-none"
      rows="5"
      :placeholder="placeholder ?? ''"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
});
</script>

<style lang="scss" scoped></style>
