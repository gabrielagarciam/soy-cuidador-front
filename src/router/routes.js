import { createMemoryHistory, createRouter } from "vue-router";
import TheMainLayout from "@/layout/TheMainLayout.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/",
    name: "home",
    component: TheMainLayout,
    redirect: () => ({ name: "blog" }),
    children: [
      {
        path: "blog",
        name: "blog",
        component: () => import("../views/BlogView.vue"),
      },
      {
        path: "blog/:id",
        name: "post",
        component: () => import("../views/PostView.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("../views/ContactView.vue"),
      },
    ],
  },
];


export default routes;
