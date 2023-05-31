<template>
    <div class="w-full h-full flex">
        <div class="w-24 z-50 relative flex flex-col flex-shrink-0 flex-wrap">
            <div @click="handleHome" class="h-20 bg-white cursor-pointer w-full flex justify-center items-center">
                <div ref="svg-logo" class="w-14 h-14 animate__animated animate__swing">
                    <SVGLogo class="fill-primary-500" />
                </div>
            </div>
            <div style="height: calc(100% - (5rem + 4rem));" class="border-r shadow-md border-gray-200 flex flex-col">
                <button v-for="(option, index) in optionsMenu" :key="index" @click="() => handlePushRouting(option.url)" :class="selectedURL.indexOf(option.url) > 0? 'bg-secondary-700 hover:bg-secondary-800 text-white': 'hover:bg-gray-200 text-secondary-700'" class="h-16 w-full text-lg transition-all border-b border-t border-gray-200">
                    <i :class="option.icon"></i>
                    <span class="sr-only">{{option.title}}</span>
                </button>
            </div>
            <button @click="handleLogout" class="h-16 bg-gray-50 shadow-inner w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-t border-gray-200">
                <i class="fas fa-sign-out-alt"></i>
                <span class="sr-only">Cerrar sesión</span>
            </button>
        </div>
        <div class="w-full h-full z-20 relative">
            <div class="bg-white shadow-md relative z-10 pl-2 pr-7 h-20 flex justify-end items-center ">
                <div>

                </div>
                <div class="flex items-center">
                    <div class="w-12 h-12 text-secondary-800 border-secondary-800 border mr-2 rounded-md flex justify-center items-center">
                        <i class="fas fa-user text-2xl"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-base text-secondary-900 font-bold">{{storeSession.session.nombres}}</span>
                        <span class="text-xs  text-secondary-900 text-opacity-70">{{storeSession.session.rol}}</span>
                    </div>
                </div>
            </div>
            <div style="height: calc(100% - 5rem);" class="z-0 relative w-full h-full overflow-y-scroll">
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
        selectedURL: '',
        optionsMenu: [
            {
                url: '/registro-ventas',
                icon: "fas fa-vote-yea",
                title: 'Registro de ventas',
            },
            {
                url: '/reporte',
                icon: "fas fa-chart-line",
                title: 'Reporte',
            },
            {
                url: '/categorias',
                icon: "fas fa-cubes",
                title: 'Categorías',
            },
            {
                url: '/productos',
                icon: "fas fa-cube",
                title: 'Productos',
            },
            {
                url: '/usuarios',
                icon: "fas fa-users",
                title: 'Usuarios',
            }
        ]
    }),
    setup(){
        return {
            storePlatForm: usePlatForm(),
            storeSession: useSession(),
        }
    },
    watch: {
        '$route.fullPath': {
            handler(newValue) {
                this.selectedURL = newValue;
            },
            immediate: true
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