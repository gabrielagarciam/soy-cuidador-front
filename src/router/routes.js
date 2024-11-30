import TheMainLayout from "@/layout/TheMainLayout.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/",
    component: TheMainLayout,
    redirect: () => ({ name: "home" }),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/MainView.vue"),
      },
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
        path: "contacto",
        name: "contact",
        component: () => import("../views/ContactView.vue"),
      },
    ],
  },
];

export default routes;
