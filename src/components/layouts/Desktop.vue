<template>
    <div class="w-full h-full flex">
        <div class="w-24 z-30 relative shadow-xl flex flex-col flex-shrink-0 flex-wrap">
            <div @click="handleHome" class="h-20 cursor-pointer w-full flex justify-center items-center">
                <div ref="svg-logo" class="w-14 h-14 animate__animated animate__swing">
                    <SVGLogo class="fill-primary-500" />
                </div>
            </div>
            <div style="height: calc(100% - (5rem + 4rem));" class="border-r border-gray-200 flex flex-col">
                <button @click="() => handlePushRouting('/registro-ventas')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-t border-gray-200">
                    <i class="fas fa-vote-yea"></i>
                    <span class="sr-only">Registro de ventas</span>
                </button>
                <button @click="() => handlePushRouting('/reporte')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200">
                    <i class="fas fa-chart-line"></i>
                    <span class="sr-only">Reporte</span>
                </button>
                <button @click="() => handlePushRouting('/categorias')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200">
                    <i class="fas fa-cubes"></i>
                    <span class="sr-only">Categorías</span>
                </button>
                <button @click="() => handlePushRouting('/productos')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200">
                    <i class="fas fa-cube"></i>
                    <span class="sr-only">Productos</span>
                </button>
                <button @click="() => handlePushRouting('/usuarios')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200">
                    <i class="fas fa-users"></i>
                    <span class="sr-only">Usuarios</span>
                </button>
            </div>
            <button @click="handleLogout" class="h-16 bg-gray-50 shadow-inner w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-t border-gray-200">
                <i class="fas fa-sign-out-alt"></i>
                <span class="sr-only">Cerrar sesión</span>
            </button>
        </div>
        <div class="w-full">
            <div class="bg-secondary-500 text-secondary-900 px-2 h-20 flex items-center z-40 relative">
                asdasd
            </div>
            <div class="p-2 z-30 relative">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import SVGLogo from '@/assets/svg/logo.svg?component';

import {usePlatForm} from '@/stores/platform';
import {useSession} from '@/stores/session';

export default {
    name: "DesktopLayout",
    components: {
        SVGLogo
    },
    data: () => ({

    }),
    setup(){
        return {
            storePlatForm: usePlatForm(),
            storeSession: useSession(),
        }
    },
    methods: {
        handlePushRouting(path){
            this.$router.push(this.storePlatForm.url+path)
        },
        handleHome(){
            this.$router.push(this.storePlatForm.url+"/home")
            this.$refs['svg-logo'].classList.remove('animate__swing')
            setTimeout(() => {
                this.$refs['svg-logo'].classList.add('animate__swing')
            }, 100);
        },
        handleLogout(){
            this.storeSession.logout()
            this.storePlatForm.deletePlatform()
            this.$router.push('/login')
        }
    }
}
</script>