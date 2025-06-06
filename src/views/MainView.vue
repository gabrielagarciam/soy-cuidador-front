<template>
  <div class="w-full flex flex-col">
    <MainSectionContainer class="hero-section relative h-screen">
      <div
        class="flex flex-col justify-center text-container w-full text-center"
      >
        <h1 class="text-5xl text-white font-bold mb-4 md:text-7xl">
          Soy cuidador
        </h1>
        <AnimatedText
          :texts="[
            'Cuidar y cuidarte.',
            'Cuidar también es amarte.',
            'El valor de cuidar.',
            'Cuidar con propósito.',
          ]"
        />
      </div>
      <ScrollToNextSection
        target-section="about-section"
        v-if="!scrollYPosition"
      />
    </MainSectionContainer>
    <MainSectionContainer class="about-section" id="about-section">
      <AboutMe />
    </MainSectionContainer>
    <MainSectionContainer
      class="post-section"
      title="Explora mi Blog"
      ctaIcon="fa-solid fa-chevron-right"
      :cta-label="
        postCarouselProps.data > postCarouselProps.pageSize ? 'Ver todos' : null
      "
    >
      <PostCarousel v-bind:="postCarouselProps" />
    </MainSectionContainer>
    <MainSectionContainer
      class="testimonals-section"
      title="Voces desde Instagram"
    >
      <TestimonialsCarousel />
    </MainSectionContainer>

    <MainSectionContainer class="subscribe-section">
      <SubscribeForm />
    </MainSectionContainer>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref, watch, onBeforeUnmount } from "vue";
import PostController from "@/controllers/PostController";
import SubscribeForm from "../components/SubscribeForm.vue";
import PostCarousel from "../components/PostCarousel.vue";
import TestimonialsCarousel from "../components/TestimonialsCarousel.vue";
import AboutMe from "../components/AboutMe.vue";
import AnimatedText from "../components/AnimatedText.vue";
import MainSectionContainer from "../components/MainSectionContainer.vue";
import ScrollToNextSection from "../components/ScrollToNextSection.vue";
import useScrollYPosition from "../composables/useScrollYPosition";
import { useIsMobile } from "../composables/useIsMobile";

const error = ref("");
const postCarouselProps = reactive({
  data: [],
  isLoading: true,
  skeletonSize: 3,
  pageSize: 3,
});

// Get scrollYPosition directly from the composable
const { scrollYPosition } = useScrollYPosition();
const { isMobile } = useIsMobile();

onBeforeMount(async () => {
  try {
    let postsData = await PostController.getCollection();
    postCarouselProps.data = postsData;
    postCarouselProps.isLoading = false;
  } catch (err) {
    error.value = "No se pudieron cargar las publicaciones";
    postCarouselProps.isLoading = false;
  }
});

watch(
  () => isMobile.value,
  (newVal) => {
    postCarouselProps.pageSize = newVal ? 1 : 3;
    postCarouselProps.skeletonSize = newVal ? 1 : 3;
  },
  { immediate: true }
);

onBeforeMount(() => useIsMobile().init());
onBeforeUnmount(() => useIsMobile().cleanup());
</script>

<style lang="postcss">
.hero-section {
  background: url("../assets/heroBackground.svg");
  background-size: cover;
  mask-size: cover;
  width: 100%;
  height: var(--screen-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-color: #6853ee;
}
.subscribe-section {
  @apply mt-10 overflow-hidden relative py-14 flex justify-center z-10;

  &::after {
    background: #f9f4f2;
    border-radius: 50%;
    content: "";
    height: 19rem;
    left: 50%;
    position: absolute;
    top: 0;
    width: 45rem;
    z-index: 0;
    transform: scale(5) translateX(-14%) translateY(40%);
  }
}
@media only screen and (min-width: 90rem) {
  .hero-section > div,
  .post-section > div,
  .testimonals-section > div,
  .about-section > div {
    max-width: 65rem;
  }
  .subscribe-section {
    > div {
      max-width: 68.5rem;
      gap: 2.5rem;
    }
  }
}

@media screen and (min-width: 1100px) {
  .hero-section {
    background-position: center bottom !important;
  }
}
@media screen and (max-width: 1100px) {
  .hero-section {
    background-position: left center !important;
  }
}
@media only screen and (min-width: 48rem) and (max-width: 90rem) {
  .hero-section > div,
  .post-section > div,
  .testimonals-section > div,
  .about-section > div {
    max-width: 50rem;
  }
  .subscribe-section {
    > div {
      max-width: 50rem;
      gap: 2.5rem;
    }
  }
}

@media only screen and (max-width: 48rem) {
  .hero-section {
    height: var(--screen-height);
  }
}
</style>
