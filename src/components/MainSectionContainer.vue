<template>
  <section class="flex justify-center pt-10 md:pt-20">
    <div class="w-full flex flex-col gap-12 px-8 z-10">
      <div class="flex flex-row justify-between" v-if="title || ctaLabel">
        <h3
          class="text-3xl font-bold mb-1 text-[#000000]/75 uppercase"
          v-if="title"
        >
          {{ title }}
        </h3>
        <ButtonBase color="primary" variant="link" class="mt-1" v-if="ctaLabel">
          <span class="text-xl">
            {{ ctaLabel }}
            <font-awesome-icon :icon="ctaIcon" v-if="ctaIcon" />
          </span>
        </ButtonBase>
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup>
import ButtonBase from "./Base/ButtonBase.vue";
defineOptions({
  inheritAttrs: true,
});

defineEmits(["click-cta"]);
defineProps({
  title: {
    type: String,
    required: false,
  },
  ctaLabel: {
    type: String,
    required: false,
  },
  ctaIcon: {
    type: String,
    required: false,
  },
});
</script>

<style lang="postcss" scoped>
@media (min-width: 90rem) {
  section > div {
    @apply max-w-[80rem];
  }
}
@media (min-width: 48rem) and (max-width: 90rem) {
  section div {
    @apply max-w-[50rem];
  }
}
</style>
