import { ref, computed } from "vue";

const screenHeight = ref(0);

export default function useScreenHeight() {
  function updateScreenHeightVar() {
    screenHeight.value = window.innerHeight;
    document.documentElement.style.setProperty(
      "--screen-height",
      `${window.innerHeight}px`
    );
  }

  return {
    screenHeight: computed(() => screenHeight.value),
    updateScreenHeightVar,
    subscribeResizeEvent: () => {
      updateScreenHeightVar();
      window.addEventListener("resize", updateScreenHeightVar);
    },
    unsubscribeResizeEvent: () => {
      window.removeEventListener("resize", updateScreenHeightVar);
    },
  };
}
