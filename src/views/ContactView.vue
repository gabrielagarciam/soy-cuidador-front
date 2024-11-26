<template>
  <div class="flex-1 flex h-full justify-center md:mt-10">
    <div class="flex-1 py-4 px-2 max-w-4xl gap-8 flex flex-col">
      <h1 class="text-3xl font-medium leading-9 text-black">
        Me encantaría saber de ti, <br />
        ¡Ponte en contacto! 👋
      </h1>
      <form
        class="flex flex-col items-center justify-center"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-col md:flex-row w-full">
          <InputBase
            label="Nombre"
            required
            v-model="formData.name"
            @blur="() => validateField('name')"
            @focus="() => (errors.name = '')"
            :error="errors.name"
          />
          <InputBase
            label="Email"
            type="email"
            v-model="formData.email"
            @blur="() => validateField('email')"
            @focus="() => (errors.email = '')"
            :error="errors.email"
            required
          />
        </div>
        <TextareaBase
          label="Mensaje"
          required
          v-model="formData.message"
          @blur="() => validateField('message')"
          @focus="() => (errors.message = '')"
          :error="errors.message"
        />

        <ButtonBase
          label="Enviar mensaje"
          color="primary"
          type="submit"
          :loading="formIsSubmitting"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import InputBase from "@/components/Base/InputBase.vue";
import TextareaBase from "@/components/Base/TextareaBase.vue";
import ButtonBase from "@/components/Base/ButtonBase.vue";
import { useAlert } from "../composables/useAlert";
import ContactController from "../controllers/ContactController";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
});
const formIsSubmitting = ref(false);
const fieldsRules = {
  name: [
    (v) => !!v || "El nombre es requerido",
    (v) =>
      (v && v.length <= 10) || "El nombre debe tener menos de 10 caracteres",
  ],
  email: [
    (v) => !!v || "El email es requerido",
    (v) => /.+@.+\..+/.test(v) || "El email debe ser válido",
  ],
  message: [
    (v) => !!v || "El mensaje es requerido",
    (v) =>
      (v && v.length <= 1000) || "El mensaje debe tener menos de 1000 caracteres",
  ],
};

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

function resetForm() {
  formData.name = "";
  formData.email = "";
  formData.message = "";
  formIsSubmitting.value = false;
}

async function handleSubmit(event) {
  event.preventDefault();

  // Validate all fields before submitting
  validateField("name");
  validateField("email");
  validateField("message");

  // If no errors, submit the form
  if (!errors.name && !errors.email && !errors.message) {
    formIsSubmitting.value = true;
    console.log("Form submitted", formData);

    try {
      // Send form data to an API
      await ContactController.send(formData);
      useAlert().showAlert({
        message: "Mensaje enviado correctamente",
        type: "success",
      });
      resetForm();
    } catch (error) {
      useAlert().showAlert({
        message: "Error al enviar el mensaje",
        type: "error",
      });
      formIsSubmitting.value = false;
    }

    // Perform actual form submission logic here (e.g., send to an API)
  }
}
</script>
