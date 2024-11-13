<template>
  <div class="bg-white shadow-md rounded-md p-4">
    <img
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover mb-4 rounded-t-md"
    />
    <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
    <p class="text-gray-600 mb-4 description">{{ description }}</p>
    <RouterLink :to="`/blog/${id}`">
      <ButtonBase
        label="Read more"
        color="primary"
        variant="link"
        class="!px-0"
      />
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ButtonBase from "@/components/Base/ButtonBase.vue";
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://via.placeholder.com/300x200",
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style lang="postcss" scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
