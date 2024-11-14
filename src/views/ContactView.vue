<template>
  <div class="flex-1 flex h-full justify-center md:mt-10">
    <div class="flex-1 py-4 px-2 max-w-4xl gap-8 flex flex-col">
      <h1 class="text-3xl font-medium leading-9 text-black">
        Me encantaría saber de ti, <br />
        ¡Ponte en contacto! 👋
      </h1>
      <form class="flex flex-col items-center justify-center">
        <div class="flex flex-col md:flex-row w-full">
          <InputBase label="Nombre" />
          <InputBase label="Email" />
        </div>
        <TextareaBase label="Mensaje" />

        <ButtonBase label="Enviar mensaje" type="submit" color="primary" />
      </form>
    </div>
  </div>
</template>

<script setup>
import InputBase from "@/components/Base/InputBase.vue";
import TextareaBase from "@/components/Base/TextareaBase.vue";
import ButtonBase from "@/components/Base/ButtonBase.vue";
</script>
