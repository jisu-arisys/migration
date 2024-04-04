import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: '/',
        name: "Dash",
        component: () => import("./pages/DashBoard"),
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
    {
        path: "/userlist",
        name: "UserList",
        component: () => import("./pages/UserList"),
    },
    {
        path: "/userupdate/:id",
        name: "UserUpdate",
        component: () => import("./pages/UserUpdate"),
    },
    {
        path: "/customerlist",
        name: "Customerlist",
        component: () => import("./pages/CustomerList"),
    },
    {
        path: "/customerupdate/:id",
        name: "CustomerUpdate",
        component: () => import("./pages/CustomerUpdate"),
    },
    {
        path: "/grouplist",
        name: "GroupList",
        component: () => import("./pages/GroupList"),
    },
    {
        path: "/groupupdate/:id",
        name: "GroupUpdate",
        component: () => import("./pages/GroupUpdate"),
    },
    {
        path: "/timetditform/:id",
        name: "TimeEditForm",
        component: () => import("./pages/TimeEditForm"),
    },
    {
        path: "/holytditform/:id",
        name: "HolyEditForm",
        component: () => import("./pages/HolyEditForm"),
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;