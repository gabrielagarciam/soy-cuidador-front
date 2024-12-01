import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // Reinicia el scroll al redirigir
  },
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
