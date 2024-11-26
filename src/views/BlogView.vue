<template>
  <div class="flex-1 flex">
    <div class="flex-1 py-4 px-2">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PostPreviewCardSkeleton
          v-for="_ in Array(skeletonLength)"
          v-if="loading"
        />
        <PostPreviewCard
          v-else
          v-bind="post"
          v-for="(post, key) in posts"
          :key="key"
          :shapePath="
            this.number % 2 !== 0
              ? `M-20 180 C40 160, 80
        100, 140 190 S220 140, 300 180`
              : `M-20 90 C40 160, 80 100, 140 190 S220
        140, 300 180`
          "
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
const skeletonLength = 3;
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
