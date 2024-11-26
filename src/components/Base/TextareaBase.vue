<template>
  <div class="mb-4 px-2 w-full">
    <label class="block mb-1 text-sm text-black/85" :for="textareaId">
      {{ label }}
    </label>

    <textarea
      :id="textareaId"
      class="w-full border border-black/10 px-4 py-2 rounded focus:border-primary focus:shadow-outline outline-none"
      :rows="rows"
      :placeholder="placeholder ?? ''"
      v-model="textareaValue"
      :class="{ 'border-red-500': error }"
      @blur="(event) => $emit('blur', event)"
      @input="(event) => $emit('input', event)"
      @focus="(event) => $emit('focus', event)"
    />

    <!-- Display error message if there's an error -->
    <div class="h-4">
      <p v-if="error" class="text-red-500 text-xs">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
defineEmits(["blur", "input", "focus"]);
// Props passed from parent component
defineProps({
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  rows: {
    type: Number,
    required: false,
    default: 5,
  },
  error: {
    type: String,
    required: false,
    default: "",
  },
});

const textareaValue = defineModel();
const textareaId = ref(new Date().getTime());


</script>
