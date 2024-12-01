<template>
  <component
    :is="isFutureDate ? 'div' : 'router-link'"
    :class="{ 'pointer-events-none': isFutureDate }"
    v-bind="{ to: isFutureDate ? undefined : `/blog/${slug}` }"
  >
    <div
      :class="[
        'bg-[#f9f4f2] rounded-lg shadow-md py-6 px-4  justify-between h-full grid grid-rows-[auto,1rem] gap-4',
        { 'cursor-pointer': !isFutureDate },
      ]"
    >
      <div class="flex flex-col gap-4">
        <!-- Title -->
        <h2 class="text-xl font-semibold text-black leading-[24px]">
          {{ title }}
        </h2>

        <!-- Description -->
        <p class="text-black/85 flex-1 text-sm description">
          {{ description }}
        </p>
      </div>

      <!-- Like and View Count -->
      <div class="flex justify-between">
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
        <div
          class="text-[12px] bg-[#FF6F61]/70 px-2 text-white rounded flex items-center justify-center"
          v-if="isFutureDate"
        >
          <span>Próximamente</span>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
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

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day); // Month is 0-based in JS Date
}
const isFutureDate = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

  const parsedDate = parseDate(props.date); // Use updated parseDate
  return parsedDate > today;
});


</script>

<style lang="postcss" scoped>
.description {
  line-height: 1.25;
  max-height: 7.5em; /* For 6 lines at 1.25 line height */
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 6; /* Limit to 6 lines */
  -webkit-line-clamp: 6; /* Limit to 6 lines */
  -webkit-box-orient: vertical;
}
</style>
