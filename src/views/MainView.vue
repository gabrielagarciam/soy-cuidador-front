<template>
  <div class="w-full flex flex-col">
    <MainSectionContainer class="hero-section !py-[25rem] relative">
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
      <ScrollToNextSection target-section="about-section"  v-if="!scrollYPosition"/>
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
import { onBeforeMount, reactive, ref } from "vue";
import PostController from "@/controllers/PostController";
import SubscribeForm from "../components/SubscribeForm.vue";
import PostCarousel from "../components/PostCarousel.vue";
import TestimonialsCarousel from "../components/TestimonialsCarousel.vue";
import AboutMe from "../components/AboutMe.vue";
import AnimatedText from "../components/AnimatedText.vue";
import MainSectionContainer from "../components/MainSectionContainer.vue";
import ScrollToNextSection from "../components/ScrollToNextSection.vue";
import useScrollYPosition from "../composables/useScrollYPosition";

const error = ref("");
const postCarouselProps = reactive({
  data: [],
  isLoading: true,
  skeletonSize: 3,
  pageSize: 3,
});
// Get scrollYPosition directly from the composable
const { scrollYPosition } = useScrollYPosition();

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
</script>

<style lang="postcss">
.hero-section {
  background: url("../assets/heroBackground.svg") center bottom / cover
    no-repeat;
  mask-size: cover;
  width: 100%;
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
</style>
