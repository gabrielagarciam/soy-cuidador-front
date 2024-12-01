<template>
  <div class="justify-center items-center grid grid-rows-[1fr, 2rem]">
    <div class="w-full h-[16rem] md:h-[8rem] overflow-hidden">
      <transition name="fade-scale" mode="out-in">
        <blockquote class="text-center py-2" :key="currentIndex">
          <p
            class="text-lg -tracking-[1px] font-medium md:text-2xl md:leading-[1.25] text-black/75"
          >
            {{ quotes[currentIndex].quote }}
          </p>
        </blockquote>
      </transition>
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
      '"Hola, mi madre tiene Alzheimer y también soy su cuidadora, una tarea difícil pero llena de amor hacia ella. Gracias por tus consejos; para mí, han sido una luz en esta oscuridad por el desconocimiento. ¡Gracias, gracias, gracias!"',
  },
  {
    quote:
      '"Hermosa tu mami y cómo logras hacer tantas cosas. Mi mamá tiene 76 años y ayer usé tu método para lograr que se bañara sin hacerla sentir mal. Gracias por crear tu cuenta; es de una ayuda enorme."',
  },
  {
    quote:
      '"¡Ahhhhh, qué hermoso contenido! Me he nutrido con cada uno de tus posts. Mi mamá tiene deterioro cognitivo y también cuido de ella. Y en todo este tiempo he descubierto que la única receta que no falla es "paciencia y amor".',
  },
  {
    quote:
      '"Dios te puso en mi camino. Mi mamá está con Alzheimer y se me hace difícil, pero te encontré."',
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

<style scoped>
/* Fade and scale transition */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-scale-enter, .fade-scale-leave-to /* .fade-scale-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave {
  opacity: 1;
  transform: scale(1);
}
</style>
