import { computed, ref, watchEffect } from "vue";

const isMobile = ref(false);
export function useIsMobile() {
  const updateIsMobile = () => {
    // console.log('gaby ', window.matchMedia("(max-width: 767px)"))
    isMobile.value = window.matchMedia("(max-width: 767px)").matches;
  };

  // Function to be called in the component
  const init = () => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
  };

  const cleanup = () => {
    window.removeEventListener("resize", updateIsMobile);
  };

  return { isMobile: computed(() => isMobile.value), init, cleanup };
}
