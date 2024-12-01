<template>
  <div class="mb-4 px-2 w-full">
    <label class="block mb-1 text-sm text-black/85" :for="inputId">
      {{ label }}
    </label>

    <input
      :id="inputId"
      class="w-full border px-4 py-2 rounded focus:border-primary focus:shadow-outline outline-none"
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder || ''"
      :class="{ 'border-red-500': error.length }"
      @blur="(event) => $emit('blur', event)"
      @input="(event) => $emit('input', event)"
      @focus="(event) => $emit('focus', event)"
      @change="(event) => $emit('change', event)"
    />

    <!-- Display error message if there's an error -->
    <div class="h-4" v-if="error">
      <p v-if="error" class="text-red-500 text-xs">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineEmits(["blur", "input", "focus", "change"]);
defineOptions({ inheritAttrs: true });

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
  type: {
    type: String,
    required: false,
    default: "text",
  },
  error: {
    type: String,
    required: false,
    default: "",
  },
});

// // State variables
const inputValue = defineModel();
const inputId = ref(new Date().getTime());
</script>
