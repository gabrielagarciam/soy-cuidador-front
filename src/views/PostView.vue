<template>
  <div class="post-content relative">
    <PostViewSkeleton v-if="loading" />
    <div
      v-else
      class="bg-white py-16 rounded max-w-[45rem] m-auto shadow z-50 mt-12"
    >
      <div class="flex flex-col gap-8">
        <div class="w-full flex flex-col gap-2">
          <h1 class="w-full text-center text-3xl font-bold text-black px-8">
            {{ source.title }}
          </h1>
          <h3
            class="w-full text-center text-sm text-black/85 leading-none px-8"
          >
            {{ source.description }}
          </h3>
          <div
            class="flex flex-row items-center justify-between border-t border-b py-2 px-8 mt-4"
          >
            <div class="flex flex-row items-center gap-1 text-xs text-black">
              <font-awesome-icon :icon="`fa-regular fa-clock`" />
              <p>
                {{ calculateReadTime(postBody) }} min read ·
                {{ source.date }}
              </p>
            </div>
            <div class="flex flex-row items-center gap-3 text-sm w-fit">
              <LikePost @click="handleLike" :likeCount="source.likeCount" />
              <hr class="h-4 w-px bg-black/10" />
              <SharePost />
            </div>
          </div>
        </div>
        <p
          class="text-black text-sm leading-6 text-justify px-8"
          v-html="postBody"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import SharePost from "../components/SharePost.vue";
import LikePost from "../components/LikePost.vue";
import calculateReadTime from "../utils/calculateReadTime";
import PostViewSkeleton from "../components/PostViewSkeleton.vue";
import PostController from "../controllers/PostController";
import { useRoute } from "vue-router";

const route = useRoute();
const source = ref({});
const loading = ref(true);
const error = ref("");

const postBody = ref("");

onBeforeMount(async () => {
  try {
    let _source = await PostController.get(route.params.id);
    source.value = _source;
    postBody.value = _source.content?.join("<br><br>");
    loading.value = false;
  } catch (err) {
    error.value = "No se pudieron cargar el post";
    loading.value = false;
  }
});

async function handleLike() {
  console.log("Like clicked");
    let _likeCount = await PostController.likePost(source.value.slug);
  source.value.likeCount = _likeCount;
}
</script>

<style lang="postcss" scoped>
.post-content {
  &::after {
    @apply bg-purple-500/25 right-0 left-0 flex h-80 top-14 fixed w-screen -z-10;
    content: " ";
    background-image: url("@/assets/postHeader.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
