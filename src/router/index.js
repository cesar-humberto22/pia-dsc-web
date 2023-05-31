import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		name: 'Login',
		path: '/login',
		component: () => import('@/views/Login.vue')
	},
	/// Desktop Routing
	{
		name: 'Desktop_Home',
		path: '/desktop/home',
		component: () => import('@/views/desktop/Home.vue')
	},
	{
		name: 'Desktop_Registro-Ventas',
		path: '/desktop/registro-ventas',
		component: () => import('@/views/desktop/Registro-Ventas.vue')
	},
	{
		name: 'Desktop_Reporte',
		path: '/desktop/reporte',
		component: () => import('@/views/desktop/Reporte.vue')
	},
	{
		name: 'Desktop_Home',
		path: '/desktop/home',
		component: () => import('@/views/desktop/Home.vue')
	},
	{
		name: 'Desktop_Categorias',
		path: '/desktop/categorias',
		component: () => import('@/views/desktop/Categorias.vue')
	},
	{
		name: 'Desktop_Productos',
		path: '/desktop/productos',
		component: () => import('@/views/desktop/Productos.vue')
	},
	{
		name: 'Desktop_Usuarios',
		path: '/desktop/usuarios',
		component: () => import('@/views/desktop/Usuarios.vue')
	},

	/// Mobile Routing
	{
		name: 'Mobile_Home',
		path: '/mobile/home',
		component: () => import('@/views/mobile/Home.vue')
	},
	{
		name: 'Mobile_Inicio',
		path: '/mobile/inicio',
		component: () => import('@/views/mobile/Home.vue')
	},
	{
		name: 'Mobile_Mi_Carrito',
		path: '/mobile/mi-carrito',
		component: () => import('@/views/mobile/Mi-Carrito.vue')
	},
	{
		name: 'Mobile_Historial',
		path: '/mobile/historial',
		component: () => import('@/views/mobile/Historial.vue')
	},
	{
		name: 'Mobile_Perfil',
		path: '/mobile/perfil',
		component: () => import('@/views/mobile/Perfil.vue')
	},

	{ 	
		name: '404',
		path: '/:pathMatch(.*)*', 
		component: () => import('@/views/404.vue') 
	}

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
