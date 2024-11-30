<template>
  <div class="flex-1 flex justify-center blog-view-wrapper">
    <div class="flex-1 px-10 py-32">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" v-if="loading">
        <PostPreviewCardSkeleton
          v-for="(_, key) in Array(skeletonLength)"
          :key="key"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4" v-else>
        <PostPreviewCard
          v-bind="post"
          v-for="(post, key) in posts"
          :key="key"
          class="w-80 h-72"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import PostPreviewCard from "@/components/PostPreviewCard.vue";
import PostPreviewCardSkeleton from "../components/PostPreviewCardSkeleton.vue";
import PostController from "../controllers/PostController";

const posts = ref([]);
const loading = ref(true);
const error = ref("");
const skeletonLength = 4;
onBeforeMount(async () => {
  try {
    let postsData = await PostController.getCollection();
    posts.value = postsData;
    loading.value = false;
  } catch (err) {
    error.value = "No se pudieron cargar las publicaciones";
    loading.value = false;
  }
});
</script>
<style lang="postcss" scoped>
@media (min-width: 90rem) {
  .blog-view-wrapper div {
    @apply max-w-[80rem];
  }
}
@media (min-width: 48rem) and (max-width: 90rem) {
  .blog-view-wrapper div {
    @apply max-w-[50rem];
  }
}
</style>
