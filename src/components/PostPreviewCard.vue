<template>
  <RouterLink :to="`/blog/${slug}`">
    <div
      class="bg-[#f9f4f2] rounded-lg shadow-md p-6 cursor-pointer flex flex-col justify-between"
    >
      <!-- Title -->
      <h2 class="text-2xl font-semibold mb-2 text-black">
        {{ title }}
      </h2>

      <!-- Description -->
      <p class="mb-2 text-black/85 text-ellipsis overflow-hidden flex-1">
        {{ description }}
      </p>

      <!-- Like and View Count -->
      <div class="flex items-center space-x-4 text-black/85">
        <div class="flex items-center space-x-1 text-black/70">
          <font-awesome-icon icon="fa-regular fa-heart" />
          <span class="font-medium">{{ likeCount }}</span>
        </div>
        <div class="flex items-center space-x-1 text-black/70">
          <font-awesome-icon icon="fa-regular fa-eye" />
          <span class="font-medium">{{ viewCount }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
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
  date: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    required: true,
    default: 0,
  },
  likeCount: {
    type: Number,
    required: true,
    default: 0,
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

/* Adjustments for text overflow and layout */
.text-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
