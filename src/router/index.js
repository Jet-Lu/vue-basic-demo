import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: 'home',
		component: () => import("@/components/layout/layout.vue"),
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/home/home.vue"),
				meta: {
					requiresAuth: true
				},
				children: [
					{
						path: '/demo1',
						name: 'manageDemo1',
						component: () =>
							import('@/views/home/demo1/demo1.vue'),
						meta: {
							requiresAuth: true
						}
					},
					{
						path: '/demo2',
						name: 'manageDemo2',
						component: () =>
							import('@/views/home/demo2/demo2.vue'),
						meta: {
							requiresAuth: true
						}
					}
				]
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import("@/views/login/login.vue"),
		meta: {
			hidden: true
		}
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
	// mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	// console.log(to);
	// if (to.meta.requiresAuth) {
		// next('login')
	// }
	// next();
	next();
})

export default router;
