<template>
    <div ref="app" class="w-full h-full flex transition-all">
        <div ref="app-menu" class="flex-shrink-0 transition-all flex-wrap flex flex-col">
            <div class="h-20 cursor-pointer w-full flex justify-center items-center">
                <div class="w-9 h-9">
                    <SVGLogo class="fill-primary-500 animate__animated animate__swing" />
                </div>
                <div class="ml-2 transform translate-y-1">
                    <span>Cafeteria</span>
                    <span class="text-primary-600 ml-0.5">Connect</span>
                </div>
            </div>
            <div style="height: calc(100% - (5rem + 4rem));" class="flex flex-col">
                <button @click="() => handlePushRouting('/inicio')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-t border-gray-200 flex items-center">
                    <div class="w-12"><i class="fas fa-home"></i></div>
                    <div class="w-11/12 text-left truncate">Inicio</div>
                </button>
                <button @click="() => handlePushRouting('/mi-carrito')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200 flex items-center">
                    <div class="w-12"><i class="fas fa-shopping-cart"></i></div>
                    <div class="w-11/12 text-left truncate">Mi Carrito</div>
                </button>
                <button @click="() => handlePushRouting('/historial')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200 flex items-center">
                    <div class="w-12"><i class="fas fa-history"></i></div>
                    <div class="w-11/12 text-left truncate">Historial</div>
                </button>
                <button @click="() => handlePushRouting('/perfil')" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-b border-gray-200 flex items-center">
                    <div class="w-12"><i class="fas fa-user"></i></div>
                    <div class="w-11/12 text-left truncate">Perfil</div>
                </button>
            </div>
            <button @click="handleLogout" class="h-16 w-full text-lg hover:bg-gray-200 transition-all text-secondary-700 border-t border-gray-200 flex items-center">
                <div class="w-12"><i class="fas fa-sign-out-alt"></i></div>
                <div class="w-11/12 text-left truncate">Cerrar sesión</div>
            </button>
        </div>
        <div @click="handleClickContent" ref="app-content" class="w-full transition-all border-l border-gray-200 h-full flex flex-col flex-shrink-0 ">
            <div class="w-full flex h-16">
                <div class="flex-shrink-0 w-16 h-full">
                    <button ref="button-bars" @click="toggleMenu" class="w-full h-full text-2xl border-r border-gray-200">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <div class="px-4 flex-shrink-0">
                    <div ref="svg-logo" class="w-14 h-14 animate__animated animate__swing">
                        <SVGLogo class="fill-primary-500" />
                    </div>
                </div>
                <div class="bg-secondary-400 rounded-b-xl h-16 w-full">

                </div>
                <div class="flex-shrink-0 w-16 h-full"></div>
            </div>
            <div class="w-full h-full">
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
    name: "Mobile",
    components: {
        SVGLogo
    },
    data: () => ({
        openMenu: true,
    }),
    setup(){
        return {
            storePlatForm: usePlatForm(),
            storeSession: useSession(),
        }
    },
    mounted(){
        this.toggleMenu()
    },
    methods: {
        toggleMenu(){
            this.openMenu = !this.openMenu;
            if(this.openMenu){
                this.$refs['app'].classList.add('overflow-hidden', 'p-2')
                this.$refs['app-menu'].classList.remove('overflow-hidden', 'w-0')
                this.$refs['app-menu'].classList.add('w-60')
                this.$refs['app-content'].classList.add('overflow-hidden', 'rounded-xl', 'shadow-lg', 'border', 'border-gray-300')
            }else{
                this.$refs['app'].classList.remove('overflow-hidden', 'p-2')
                this.$refs['app-menu'].classList.remove('w-60')
                this.$refs['app-menu'].classList.add('overflow-hidden', 'w-0')
                this.$refs['app-content'].classList.remove('overflow-hidden', 'rounded-xl', 'shadow-lg', 'border', 'border-gray-300')
            }
        },
        handlePushRouting(path){
            this.toggleMenu()
            this.$router.push(this.storePlatForm.url+path)
        },
        handleLogout(){
            this.storeSession.logout()
            this.storePlatForm.deletePlatform()
            this.$router.push('/login')
        },
        handleClickContent(e){
            if(this.openMenu && !e.target.contains(this.$refs['button-bars'])){
                this.toggleMenu();
            }
        }
    }
}
</script>