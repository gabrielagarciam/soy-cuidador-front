<template>
  <div class="flex flex-col justify-center items-center h-fit gap-10">
    <div class="w-full">
      <blockquote class="text-center py-2">
        <p
          class="text-lg -tracking-[1px] font-medium md:text-2xl md:leading-[1.25] text-black/75"
        >
          {{ quotes[currentIndex].quote }}
        </p>
        <cite class="block mt-4 font-medium text-black/65">
          {{ quotes[currentIndex].author }}
        </cite>
      </blockquote>
    </div>
    <div class="flex justify-center w-full">
      <button @click="handlePrev" class="text-black w-8 h-8 hover:text-primary">
        <font-awesome-icon icon="fa-solid fa-chevron-left text-lg" />
      </button>
      <button @click="handleNext" class="text-black w-8 h-8 hover:text-primary">
        <font-awesome-icon icon="fa-solid fa-chevron-right text-lg" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const quotes = [
  {
    quote:
      '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nib"',
    author: "lorem ipsum dolor sit amet , lorem ipsum",
  },
  {
    quote:
      '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nib"',
    author: "lorem ipsum dolor sit amet , lorem ipsum",
  },
  {
    quote:
      '"lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nib"',
    author: "lorem ipsum dolor sit amet , lorem ipsum",
  },
];

const currentIndex = ref(0);

const handlePrev = () => {
  currentIndex.value =
    currentIndex.value === 0 ? quotes.length - 1 : currentIndex.value - 1;
};

const handleNext = () => {
  currentIndex.value =
    currentIndex.value === quotes.length - 1 ? 0 : currentIndex.value + 1;
};
</script>
