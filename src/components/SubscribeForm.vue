<template>
  <div class="flex justify-center">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="py-2 hidden md:block">
        <font-awesome-icon
          icon="fa-regular fa-envelope-open "
          class="text-5xl text-primary/85"
        />
      </div>
      <div>
        <p class="text-2xl">Mantente al día</p>
        <p class="text-sm text-black/85 leading-4">
          Sé el primero en recibir actualizaciones<br />
          sobre nuestro contenido más reciente.
        </p>
      </div>
      <form class="flex w-fit items-center" @submit.prevent="handleSubmit">
        <div class="h-16">
          <InputBase
            type="email"
            placeholder="Tu correo electrónico"
            class="!mb-0 !pl-0"
            :disabled="formIsSubmitting"
            :error="errors.email"
            v-model="formData.email"
            @blur="() => (errors.email ? validateField('email') : null)"
          />
        </div>
        <div class="h-full pt-2 flex items-start">
          <ButtonBase
            color="primary"
            variant="default"
            type="submit"
            :loading="formIsSubmitting"
          >
            Suscribirme
          </ButtonBase>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import InputBase from "@/components/Base/InputBase.vue";
import ButtonBase from "@/components/Base/ButtonBase.vue";
import SubscribeController from "../controllers/SubscribeController";
import { useAlert } from "../composables/useAlert";

const formIsSubmitting = ref(false);
const formData = reactive({
  email: "",
});
const errors = reactive({
  email: "",
});
const fieldsRules = {
  email: [
    (v) => !!v || "El email es requerido",
    (v) => /.+@.+\..+/.test(v) || "El email debe ser válido",
  ],
};

function resetForm() {
  formData.name = "";
  formData.email = "";
  formData.message = "";
  formIsSubmitting.value = false;
}

function validateField(field) {
  // Clear any previous error message
  errors[field] = "";

  // Run each validation rule for the field
  for (let rule of fieldsRules[field]) {
    const validationResult = rule(formData[field]);
    if (validationResult !== true) {
      errors[field] = validationResult;
      break; // Exit after the first error
    }
  }
}

async function handleSubmit(event) {
  console.log("Form submitted", formData);
  event.preventDefault();

  // Validate all fields before submitting
  validateField("email");
  // If no errors, submit the form
  if (!errors.email) {
    formIsSubmitting.value = true;
    console.log("Form submitted", formData);

    try {
      // Send form data to an API
      await SubscribeController.subscribe(formData);
      useAlert().showAlert({
        message:
          "¡Gracias por suscribirte! Pronto recibirás nuestras novedades.",
        type: "success",
      });
      resetForm();
    } catch (error) {
      console.log("error", error);
      if (error.status === 409) {
        useAlert().showAlert({
          message:
            "¡Gracias por suscribirte! Pronto recibirás nuestras novedades.",
          type: "success",
        });
        resetForm();
      } else {
        useAlert().showAlert({
          message: "Algo salió mal. Por favor, intenta nuevamente.",
          type: "error",
        });
      }
    } finally {
      formIsSubmitting.value = false;
    }
  }
}
</script>
