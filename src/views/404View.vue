<template>
  <div class="flex justify-center not-found-view-wrapper h-screen w-full">
    <div class="flex flex-col gap-2 items-center justify-center">
      <img
        src="@/assets/notFoundImage.jpg"
        alt="Ilustración de página no encontrada"
        class="h-48 w-48"
      />
      <div class="flex flex-col items-center justify-center -mt-8">
        <h2 class="text-black/90 text-4xl mb-4">
          ¡Ups! No pudimos encontrar esta página
        </h2>

        <a href="/" class="text-primary">Volver al inicio</a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
@media (min-width: 90rem) {
  .not-found-view-wrapper > div {
    @apply max-w-[80rem];
  }
}
@media (min-width: 48rem) and (max-width: 90rem) {
  .not-found-view-wrapper > div {
    @apply max-w-[60rem];
  }
}
</style>
