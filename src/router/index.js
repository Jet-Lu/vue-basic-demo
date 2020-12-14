import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("@/views/login/login.vue")
    },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/home.vue"),
        children: [
            {
                path: '/home/demo1',
                name: 'manageDemo1',
                component: () =>
                    import('@/views/manage/demo1/demo1.vue'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/home/demo2',
                name: 'manageDemo2',
                component: () =>
                    import('@/views/manage/demo2/demo2.vue'),
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import("@/views/404/index.vue"),
        meta: {
            hidden: true
        }
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
