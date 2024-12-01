<template>
  <div class="w-full">
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-60 h-auto"
      v-if="isLoading"
    >
      <PostPreviewCardSkeleton
        v-for="(_, key) in Array(skeletonSize)"
        :key="key"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-60 h-auto" v-else>
      <PostPreviewCard
        v-for="(item, index) in currentPage"
        v-bind="item"
        :key="index"
      />
    </div>

    <div class="flex justify-center mt-8">
      <button
        @click="prevPage"
        :disabled="currentPageIndex === 0"
        class="text-black w-8 h-8 text-sm"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left" />
      </button>
      <button
        v-for="pageIndex in pageCount"
        :key="pageIndex"
        @click="handlePageClick(pageIndex - 1)"
        :class="[
          ' rounded-full mx-1 text-[12px] w-8 h-8',
          {
            'bg-stone-100 text-black': pageIndex - 1 !== currentPageIndex,
          },
          {
            'text-white bg-black': pageIndex - 1 === currentPageIndex,
          },
        ]"
      >
        {{ pageIndex }}
      </button>
      <button
        @click="nextPage"
        :disabled="currentPageIndex === pageCount - 1"
        class="text-black w-8 h-8 text-sm"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-sm" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PostPreviewCard from "./PostPreviewCard.vue";
import PostPreviewCardSkeleton from "./PostPreviewCardSkeleton.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  skeletonSize: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: false,
    default: 3,
  },
});

const pages = computed(() => {
  const chunks = [];
  for (let i = 0; i < props.data.length; i += props.pageSize) {
    chunks.push(props.data.slice(i, i + props.pageSize));
  }
  return chunks;
});
const currentPageIndex = ref(0);
const currentPage = computed(() => pages.value[currentPageIndex.value]);
const pageCount = computed(() => pages.value.length);

const prevPage = () => {
  if (currentPageIndex.value > 0) {
    currentPageIndex.value--;
  }
};

const nextPage = () => {
  if (currentPageIndex.value < pageCount.value - 1) {
    currentPageIndex.value++;
  }
};

const handlePageClick = (index) => {
  currentPageIndex.value = index;
};
</script>
