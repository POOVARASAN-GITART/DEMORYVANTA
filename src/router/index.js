import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Support from "../views/Support.vue";
import Register from "../views/Register.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home,
		},
		{
			path: "/about",
			name: "about",
			component: About,
		},
		{
			path: "/support",
			name: "support",
			component: Support,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return { el: to.hash, behavior: "smooth" };
		}
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0, behavior: "smooth" };
		}
	},
});

export default router;
