import { computed, ref } from "vue";
const alert = ref({
  visible: false,
  type: "info", // Possible values: 'error', 'info', 'warning', 'success'
  title: "Notification",
  message: "",
});

export function useAlert() {
  const showAlert = (options) => {
    alert.value = {
      visible: true,
      type: options.type || "info",
      message: options.message || "",
    };
    console.log("gaby showAlert", alert.value);
  };

  const hideAlert = () => {
    alert.value.visible = false;
  };

  return {
    alert: computed(() => alert.value),
    showAlert,
    hideAlert,
  };
}
