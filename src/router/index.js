import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		name: 'Home',
		path: '/',
		component: () => import('@/views/Home.vue')
	},
	{
		name: 'About',
		path: '/about',
		component: () => import('@/views/About.vue')
	},
	{
		name: 'Blank',
		path: '/blank',
		component: () => import('@/views/Blank.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
