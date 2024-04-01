import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: '/',
        name: "Users1",
        component : () => import("./pages/Users"),
        // redirect: '/admin/overview',
        // children:[
        //   {
        //     path: 'login',
        //     name: 'Login',
        //     component: Login
        //   },
        // ]
      },
    {
        path: "/u",
        name: "Users",
        component: () => import("./pages/Users"),
    },
    {
        path: "/user/:id",
        name: "User",
        component: () => import("./pages/User"),
    },
    {
        path: "/v",
        name: "Vdns",
        component: () => import("./pages/Vdns"),
    },
    {
        path: "/vdn/:id",
        name: "Vdn",
        component: () => import("./pages/Vdn"),
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;