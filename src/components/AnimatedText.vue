<template>
  <div class="animated-text-container h-fit">
    <h1
      class="animated-text text-3xl text-white/85 md:text-6xl h-fit w-full break-words md:max-w-full md:whitespace-nowrap md:overflow-hidden"
    >
      <span>{{ currentText }}</span>
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  texts: {
    type: Array,
    required: true,
  },
  interval: {
    type: Number,
    default: 150, // Time between each letter
  },
  pauseDuration: {
    type: Number,
    default: 1000, // Pause after a text finishes
  },
});

const currentText = ref("");
const currentIndex = ref(0);
let typingInterval = null;
let fullText = "";

// Type text by adding one letter at a time
const typeText = (text) => {
  fullText = text;
  currentText.value = "";
  let letterIndex = 0;

  typingInterval = setInterval(() => {
    currentText.value += fullText[letterIndex];
    letterIndex++;
    if (letterIndex >= fullText.length) {
      clearInterval(typingInterval);
      // Pause before switching to the next text
      setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % props.texts.length;
        startTypingAnimation();
      }, props.pauseDuration);
    }
  }, props.interval);
};

// Start the typing animation with the current text
const startTypingAnimation = () => {
  typeText(props.texts[currentIndex.value]);
};

// Cleanup typing interval before unmounting the component
onBeforeUnmount(() => {
  clearInterval(typingInterval);
});

// Start typing animation when component is mounted
onMounted(() => {
  startTypingAnimation();
});
</script>

<style scoped>
.animated-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

.animated-text {
  @apply flex items-center justify-center w-full;
  span::after {
    @apply inline-block border-r-4 border-white pr-1 h-7 md:h-14 mt-1;
    content: " ";
    animation: caret-blink 0.7s step-end infinite;
  }
}

@keyframes caret-blink {
  50% {
    border-color: transparent;
  }
}
</style>
