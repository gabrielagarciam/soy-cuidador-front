<template>
  <button
    :class="[
      `px-2 py-1 rounded border focus:outline-none cursor-pointer hover:opacity-80  ${buttonClass}`,
      { 'invert-color': ['default'].includes(variant) },
      { [`bg-${color} border-${props.color}`]: variant === 'default' && color },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
    @mouseover="$emit('hover')"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
    <slot>
      <span>{{ label }}</span>
    </slot>
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
});

const buttonClass = computed(() => {
  let colorClasses = "";
  let sizeClasses =
    props.size === "sm"
      ? "text-sm h-8"
      : props.size === "lg"
      ? "text-lg h-12"
      : "text-base h-10";

  if (props.variant === "outlined") {
    colorClasses = `bg-transparent border-${props.color} text-${props.color}`;
  }
  if (props.variant === "text") {
    colorClasses = `!bg-transparent !border-none text-${props.color}`;
  }
  if (props.variant === "link") {
    colorClasses = `!bg-transparent !border-none text-${props.color}`;
  }

  if (props.variant === "default" && props.color) {
    colorClasses = `!bg-${props.color} border-${props.color}`;
  }

  return `${colorClasses} ${sizeClasses}`;
});
</script>

<style lang="postcss" scoped>
button.invert-color {
  span {
    filter: invert(1);
    mix-blend-mode: luminosity;
  }
}
</style>
