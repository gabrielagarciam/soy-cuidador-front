<template>
  <div class="scroll-to-next">
    <button @click="scrollToNext" class="scroll-button rounded-full">
      <font-awesome-icon icon="fa-solid fa-chevron-down" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  targetSection: {
    type: String,
    required: true, // The name of the section to scroll to
  },
});
const isVisible = ref(false); // Track visibility of the parent content
let observer = null;
const scrollToNext = () => {
  const targetElement = document.querySelector(`#${props.targetSection}`); // Use `id` to find the section
  if (targetElement) {
    const offset = - 64; 
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth", // Smooth scrolling animation
    });
  }
};

const observeVisibility = (entries) => {
  // Update visibility state based on Intersection Observer
  entries.forEach((entry) => {
    isVisible.value = entry.isIntersecting;
  });
};

onMounted(() => {
  const parentElement = document.querySelector(".scroll-to-next").parentElement;
  if (parentElement) {
    observer = new IntersectionObserver(observeVisibility, {
      root: null, // Observe within the viewport
      threshold: 0.1, // Visibility threshold (10% visible)
    });
    observer.observe(parentElement);
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect(); // Clean up observer
  }
});
</script>

<style lang="postcss" scoped>
.scroll-to-next {
  text-align: center;
  margin: 20px 0;
  @apply fixed bottom-[1rem] left-1/2 transform -translate-x-1/2;
}

.scroll-button {
  @apply bg-white text-primary rounded-full text-lg cursor-pointer  text-center w-10 h-10 shadow-xl;
  transition: background-color 0.3s;
}
</style>
