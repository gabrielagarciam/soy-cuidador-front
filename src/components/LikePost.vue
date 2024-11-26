<template>
  <ButtonBase
    class="flex flex-row items-center gap-1 text-xs text-black"
    variant="text"
    size="sm"
    @click="(e) => $emit('click', e)"
    :class="{
      'animate-bounce ': isLiked,
      'text-red-500': isLiked,
    }"
  >
    <font-awesome-icon :icon="`fa-regular fa-heart`" />
    <p>{{ likeCount }}</p>
  </ButtonBase>
</template>

<script setup>
import { ref } from "vue";
import ButtonBase from "@/components/Base/ButtonBase.vue";

defineEmits(["click"]);

const props = defineProps({
  likeCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const isLiked = ref(false);

// const handleLikeClick = () => {
//   isLiked.value = !isLiked.value;

//   // Optional: Reset animation after a short delay
//   if (isLiked.value) {
//     setTimeout(() => {
//       isLiked.value = false;
//     }, 1000);
//   }
// };
</script>

<style lang="scss" scoped>
.fa-heart {
  transition: color 0.3s ease;
}
</style>
