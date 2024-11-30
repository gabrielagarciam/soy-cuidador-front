<template>
  <button
    :class="[
      `relative px-2 py-1 rounded focus:outline-none cursor-pointer hover:opacity-80 ${buttonClass}`,
      { 'opacity-80 pointer-events-none': loading },
      { 'invert-color': ['default'].includes(variant) },
    
    ]"
    :disabled="disabled"
    @click="(event) => $emit('click', event)"
    @mouseover="(event) => $emit('hover', event)"
    @focus="(event) => $emit('focus', event)"
    @blur="(event) => $emit('blur', event)"
  >
    <span>
      <slot>
        <div class="flex flex-row gap-2">
          <div v-if="loading" class="spinner-wrapper">
            <div class="spinner"></div>
          </div>
          <span>{{ label }} </span>
        </div>
      </slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";

defineEmits(["click", "hover", "focus", "blur"]);
defineOptions({ inheritAttrs: true });
const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: "default",
    validator: (value) =>
      ["default", "outlined", "text", "link"].includes(value),
  },
  color: {
    type: String,
    required: false,
    default: "default",
    validator: (value) => ["default", "primary", "secondary"].includes(value),
  },
  label: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const buttonClass = computed(() => {
  let colorClasses = "";
  let sizeClasses =
    props.size === "sm"
      ? "text-sm h-8"
      : props.size === "lg"
      ? "text-lg h-12"
      : "text-base h-9";

  const colorMap = {
    primary: "bg-primary border-primary text-white",
    secondary: "bg-secondary border-secondary text-white",
    default: "text-primary bg-white border-gray-300",
  };

  if (props.variant === "outlined") {
    colorClasses = `bg-transparent border ${colorMap[props.color] || ""}`;
  } else if (props.variant === "text") {
    colorClasses = `bg-transparent ${colorMap[props.color] || ""}`;
  } else if (props.variant === "link") {
    colorClasses = `bg-transparent ${colorMap[props.color] || ""}`;
  } else if (props.variant === "default") {
    colorClasses = `${colorMap[props.color] || ""}`;
  }

  return `${colorClasses} ${sizeClasses}`;
});


</script>

<style lang="postcss" scoped>
.spinner-wrapper {
  pointer-events: none;
  @apply pointer-events-none flex items-center justify-center;
  .spinner {
    @apply border  border-solid border-gray-200 border-t border-t-primary rounded-full w-4 h-4 animate-spin;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
