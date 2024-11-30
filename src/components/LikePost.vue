<template>
  <ButtonBase
    class="flex flex-row items-center text-xs text-black px-0"
    variant="text"
    size="sm"
    @click="(e) => $emit('click', e)"
  >
    <div class="flex flex-row items-center gap-1">
      <font-awesome-icon
        :icon="isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
        :class="[
          'heart-icon',
          {
            'text-red-500': isLiked,
            'animate-like': isLiked,
            'scale-125': isLiked,
          },
        ]"
      />
      <p :class="{ 'text-red-500': isLiked }">{{ likeCount }}</p>
    </div>
  </ButtonBase>
</template>

<script setup>
import { ref, watch } from "vue";
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

watch(
  () => props.likeCount,
  (newValue, oldValue) => {
    if (newValue > oldValue) {
      isLiked.value = true;
      setTimeout(() => {
        isLiked.value = false;
      }, 1000);
    }
  }
);
</script>

<style scoped>
.heart-icon {
  transition: all 0.3s ease;
  font-size: 1rem;
}

.animate-like {
  animation: like-pulse 0.5s ease-in-out;
}

@keyframes like-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
</style>
