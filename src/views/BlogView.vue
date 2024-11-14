<template>
  <div class="flex-1 flex">
    <div class="flex-1 py-4 px-2">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PostPreviewCard
          v-bind="post"
          v-for="(post, key) in posts"
          :key="key"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import PostPreviewCard from "@/components/PostPreviewCard.vue";
import PostController from "../controllers/PostController";

const posts = ref([]);
const loading = ref(true);
const error = ref("");
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
