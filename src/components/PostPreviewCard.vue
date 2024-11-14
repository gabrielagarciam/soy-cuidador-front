<template>
  <div class="relative w-80 h-72 rounded-3xl overflow-hidden cursor-pointer">
    <RouterLink :to="`/blog/${slug}`">
      <div class="absolute inset-0 bg-primary">
        <div class="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path
              :d="shapePath"
              fill="none"
              stroke="rgb(87 72 129 / 51%)"
              stroke-width="50"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <!-- Card content -->
      <div class="relative h-full p-6 flex flex-col justify-between">
        <!-- Header -->
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <span class="text-white/90 text-sm">{{ date }}</span>
          </div>
          <h2 class="text-4xl text-white font-bold">{{ title }}</h2>
          <p class="text-white/90 text-sm leading-snug description">
            {{ description }}
          </p>
        </div>

        <!-- Footer -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-1">
            <font-awesome-icon
              icon="fa-regular fa-heart"
              class="text-white"
            />
            <span class="text-white font-medium">5</span>
          </div>
          <div class="flex items-center space-x-1">
            <font-awesome-icon icon="fa-regular fa-eye" class="text-white" />
            <span class="text-white font-medium">50</span>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  shapePath: {
    type: String,
    required: true,
  },
  date: {
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
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
