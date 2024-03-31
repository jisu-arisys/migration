import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/u",
        name: "Users",
        component: () => import("./components/Users"),
    },
    {
        path: "/user/:id",
        name: "User",
        component: () => import("./components/User"),
    },
    {
        path: "/v",
        name: "Vdns",
        component: () => import("./components/Vdns"),
    },
    {
        path: "/vdn/:id",
        name: "Vdn",
        component: () => import("./components/Vdn"),
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;