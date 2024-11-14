<template>
  <transition name="fade" appear>
    <div
      class="absolute right-0 left-0 m-auto z-50 w-fit top-4"
      v-if="alertManager.alert.value.visible"
    >
      <div :class="['flex items-center px-4 py-2 rounded-lg', alertTypeClass]">
        <font-awesome-icon :icon="alertIcon" class="mr-3 text-xl" />

        <div class="flex flex-row justify-between items-center ml-2">
          <p class="text-sm">{{ alertManager.alert.value.message }}</p>
          <p
            class="text-sm ml-4 cursor-pointer text-black/70"
            @click="alertManager.hideAlert"
          >
            x
          </p>
        </div>
      </div>

      <!-- Progress bar -->
      <div
        :class="[
          'h-1 -mt-1 rounded-b-md overflow-hidden mx-1',
          progressBarClass,
        ]"
      >
        <div
          :class="[
            'h-full  transition-all duration-3000 ease-linear',
            alertTypeClass,
          ]"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, watchEffect, ref } from "vue";
import { useAlert } from "../../composables/useAlert";

const alertManager = useAlert();
const progress = ref(100);
const duration = 3000; // 3000ms = 3 seconds

watchEffect(() => {
  if (alertManager.alert.value.visible) {
    progress.value = 100;

    // Start a countdown to decrease the progress bar width over the alert duration
    const interval = setInterval(() => {
      progress.value -= 100 / (duration / 100); // Update the progress every 100ms
      if (progress.value <= 0) {
        clearInterval(interval);
        alertManager.hideAlert();
      }
    }, 100);
  }
});

const alertTypeClass = computed(() => {
  switch (alertManager.alert.value.type) {
    case "error":
      return "bg-red-100 text-red-700";
    case "info":
      return "bg-blue-100 text-blue-700";
    case "warning":
      return "bg-yellow-100 text-yellow-700";
    case "success":
      return "bg-green-100 text-green-700";
    default:
      return "bg-blue-500";
  }
});

const progressBarClass = computed(() => {
  switch (alertManager.alert.value.type) {
    case "error":
      return "bg-red-400";
    case "info":
      return "bg-blue-400";
    case "warning":
      return "bg-yellow-400";
    case "success":
      return "bg-green-400";
    default:
      return "bg-blue-400";
  }
});
const alertIcon = computed(() => {
  switch (alertManager.alert.value.type) {
    case "error":
      return "fa-regular fa-times-circle";
    case "info":
      return "fa-regular fa-question-circle";
    case "warning":
      return "fa-regular fa-hand-paper";
    case "success":
      return "fa-regular fa-check-circle";
    default:
      return "fa-regular fa-question-circle";
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
