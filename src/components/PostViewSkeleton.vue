<template>
  <div class="flex flex-col gap-8 md:min-w-[43rem] w-full">
    <div class="w-full flex flex-col gap-2">
      <div class="w-full flex flex-col gap-2 items-center">
        <div class="w-[70%] h-4 rounded skeleton-animation" />
        <div class="w-[50%] h-3 rounded skeleton-animation" />
      </div>

      <div
        class="flex flex-row items-center justify-between border-t border-b py-2 px-8 mt-4"
      >
        <div class="flex flex-row items-center gap-1">
          <div class="w-32 h-2 rounded skeleton-animation" />
        </div>
        <div class="flex flex-row items-center gap-1 text-sm w-fit">
          <div class="w-28 h-2 rounded skeleton-animation" />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 justify-center items-center">
      <div
        class="w-[90%] h-4 rounded skeleton-animation"
        v-for="_ in Array(14)"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.skeleton-animation {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 2s infinite ease-in-out;
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
