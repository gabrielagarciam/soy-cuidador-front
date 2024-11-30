import { onMounted, onBeforeUnmount, ref, computed } from "vue";

const scrollYPosition = ref(0);

export default function useScrollYPosition() {
  function setScrollPosition() {
    scrollYPosition.value =
      window.scrollY || document.documentElement.scrollTop;
  }

  onMounted(() => {
    window.addEventListener("scroll", setScrollPosition);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", setScrollPosition);
  });

  return { scrollYPosition: computed(() => scrollYPosition.value) };
}
