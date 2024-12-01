<template>
  <div class="post-content relative mb-4">
    <div
      class="bg-white rounded max-w-[20rem] md:max-w-[45rem] m-auto shadow z-50 py-10 mt-28"
    >
      <PostViewSkeleton v-if="loading" />
      <div class="flex flex-col gap-8" v-else>
        <div class="w-full flex flex-col gap-2">
          <h1
            class="w-full text-center text-3xl font-bold text-black px-4 md:px-8"
          >
            {{ source.title }}
          </h1>
          <h3
            class="w-full text-center text-sm text-black/85 leading-none px-4 md:px-8"
          >
            {{ source.description }}
          </h3>
          <div
            class="flex flex-row items-center justify-between border-t border-b py-2 px-2 md:px-8 mt-4"
          >
            <div class="flex flex-row items-center gap-1 text-xs text-black">
              <font-awesome-icon :icon="`fa-regular fa-clock`" />
              <p>
                {{ calculateReadTime(source.content) }} min de lectura ·
                {{ source.date }}
              </p>
            </div>
            <div
              class="flex flex-row items-center gap-1 md:gap-3 text-sm w-fit"
            >
              <LikePost @click="handleLike" :likeCount="source.likeCount" />
              <hr class="h-4 w-px bg-black/10" />
              <SharePost />
            </div>
          </div>
        </div>
        <div
          v-html="renderedHtml"
          class="markdown-output text-black px-4 md:px-8"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import SharePost from "../components/SharePost.vue";
import LikePost from "../components/LikePost.vue";
import calculateReadTime from "../utils/calculateReadTime";
import PostViewSkeleton from "../components/PostViewSkeleton.vue";
import PostController from "../controllers/PostController";
import { marked } from "marked";

const route = useRoute();
const source = ref({});
const loading = ref(true);
const error = ref("");
const postBody = ref("");

onBeforeMount(async () => {
  try {
    let _source = await PostController.get(route.params.id);
    source.value = _source;

    loading.value = false;
  } catch (err) {
    error.value = "No se pudieron cargar el post";
    loading.value = false;
  }
});

const renderedHtml = computed(() => {
  return marked(source.value.content, {
    gfm: true, // Soporta GitHub-Flavored Markdown
    breaks: true, // Convierte saltos de línea a <br>
  });
});

async function handleLike() {
  try {
    source.value.likeCount = source.value.likeCount + 1;
    await PostController.likePost(source.value.slug);
  } catch (err) {
    source.value.likeCount = source.value.likeCount - 1;
  }
}
</script>

<style lang="postcss">
.post-content {
  &::after {
    @apply bg-purple-500/25 right-0 left-0 flex h-80 top-14 fixed w-screen -z-10;
    content: " ";
    background-image: url("@/assets/postHeader.svg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .markdown-output h1 {
    font-size: 1.875rem; /* Base title size */
    margin-bottom: 1rem;
  }

  .markdown-output h2 {
    font-size: 1.5rem; /* 80% of h1 */
    margin-bottom: 0.75rem;
  }

  .markdown-output h3 {
    font-size: 1.25rem; /* 67% of h1 */
    margin-bottom: 0.5rem;
  }

  .markdown-output h4 {
    font-size: 1.125rem; /* Slightly smaller for deep hierarchy */
    margin-bottom: 0.5rem;
  }

  .markdown-output p {
    font-size: 1rem; /* Base size for body text */
    line-height: 1.6; /* Increase readability */
    margin-bottom: 1rem;
  }

  .markdown-output ul,
  .markdown-output ol {
    font-size: 1rem; /* Matches body text */
    line-height: 1.6;
    margin-left: 1.5rem; /* Indent lists for clarity */
    margin-bottom: 1rem;
  }

  .markdown-output strong {
    font-weight: bold; /* Emphasize important text */
  }

  .markdown-output em {
    font-style: italic; /* Style for emphasized text */
  }

  .markdown-output blockquote {
    font-size: 1rem; /* Matches body text */
    font-style: italic;
    border-left: 4px solid #ccc;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #555;
  }

  .markdown-output code {
    font-family: monospace;
    background-color: #f5f5f5;
    font-size: 0.875rem; /* Slightly smaller for inline code */
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
}
</style>
