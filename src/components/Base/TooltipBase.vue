<template>
  <!-- Component Start -->
  <div
    class="relative flex flex-col items-center group"
    @mouseenter="showTooltip('hover')"
    @mouseleave="hideTooltip('hover')"
    @click="toggleTooltip('click')"
  >
    <!-- Trigger Element -->
    <div class="cursor-pointer">
      <slot name="trigger">
        <svg
          class="w-5 h-5 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
      </slot>
    </div>

    <!-- Tooltip -->
    <div
      v-if="isVisible"
      :class="['absolute flex flex-col items-center', tooltipPositionClass]"
    >
      <span
        class="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg w-max max-w-56"
      >
        <slot name="title" />
      </span>
      <div
        :class="['w-3 h-3 rotate-45 bg-black absolute', arrowPositionClass]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  title: String,
  trigger: {
    type: String,
    default: "hover",
    validator: (value) => ["hover", "click"].includes(value),
  },
  placement: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value),
  },
});

// Tooltip visibility
const isVisible = ref(true);

// Show and hide functions based on trigger prop
const showTooltip = (type) => {
  if (props.trigger === type) isVisible.value = true;
};
const hideTooltip = (type) => {
  if (props.trigger === type) isVisible.value = false;
};
const toggleTooltip = (type) => {
  if (props.trigger === type) isVisible.value = !isVisible.value;
};

// Tooltip and arrow positioning
const tooltipPositionClass = computed(() => {
  switch (props.placement) {
    case "top":
      return "bottom-full mb-5";
    case "bottom":
      return "top-full mt-5";
  }
});

const arrowPositionClass = computed(() => {;
  switch (props.placement) {
    case "top":
      return "-mb-[.25rem] bottom-0";
    case "bottom":
      return "-mt-[.25rem] top-0";
  }
});
</script>

<style scoped>
/* Custom styles */
</style>
