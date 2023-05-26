<template>
<section class="w-full  flex justify-center items-center">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <div class="w-9 h-9">
                <SVGLogo class="fill-primary-500 animate__animated animate__swing" />
            </div>
            <div class="ml-2 transform translate-y-1">
                <span>Cafeteria</span>
                <span class="text-primary-600 ml-0.5">Connect</span>
            </div>
        </div>
        <div :class="storePlatform.platform === PLATFORMMOBILE? 'animate__bounceIn animate__animated ': ''" class="w-96 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div v-if="!view" class="animate__animated animate__fadeIn p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Bienvenid@
                </h1>
                <form @submit="handleSubmit" class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="matricula" class="block mb-2 text-sm font-medium text-gray-900">Matricula</label>
                        <input type="text" name="form-tuition" id="matricula" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="1990142" required></div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                        <input type="password" name="form-password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></div>

                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar sesión</button>

                    <button type="button" @click="handleOpenRegister" v-if="storePlatform.platform === PLATFORMMOBILE" class="w-full bg-primary-100 text-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar</button>
                </form>
            </div>
            <div v-else-if="view" class="animate__animated animate__fadeIn p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Registro de estudiante
                </h1>
                <form @submit="handleSubmitRegister" class="w-full max-w-lg space-y-4">
                    <div class="flex flex-wrap space-y-4 -mx-3 mb-2">
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-first-name">
                                Nombres
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="form-first-name" type="text" placeholder="Juan">
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-last-name">
                                Apellidos
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="form-last-name" type="text" placeholder="Pérez González">
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-age">
                                Edad
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="form-age" type="number" placeholder="14">
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="form-tuition">
                                Matricula
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="form-tuition" type="text" placeholder="1990142">
                        </div>
                    </div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrar</button>

                    <button type="button" @click="handleOpenRegister" class="w-full bg-primary-100 text-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar sesión</button>
                </form>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {
    usePlatForm,
    PLATFORMDESKTOP,
    PLATFORMMOBILE
} from '@/stores/platform';
import {useSession} from '@/stores/session';

import SVGLogo from '@/assets/svg/logo.svg?component';

export default {
    name: "Login",
    components: {
        SVGLogo,
    },
    data: () => ({
        PLATFORMDESKTOP,
        PLATFORMMOBILE,

        view: 0 /// 0 = login normal, 1 = registrarse solo como cliente
    }),
    mounted(){
        console.log(this.storePlatform.platform)
        if(this.storeSession.isLogin){
            this.$router.push(this.storePlatform.url+'/home')
        }
    },
    setup() {
        return {
            storePlatform: usePlatForm(),
            storeSession: useSession()
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target)
            this.storePlatform.setPlatform()
            this.storeSession.login({
                tuition: formData.get('form-tuition'),
                password: formData.get('form-password')
            })
            //// enviar login
            /*
                form-tuition / usuario
                form-password
            */

        },
        handleSubmitRegister(){
            e.preventDefault();
            const formData = new FormData(e.target)
            this.storePlatform.setPlatform()
            this.storeSession.register({
                firstName: formData.get('form-first-name'),
                lastName: formData.get('form-last-name'),
                age: formData.get('form-age'),
                tuition: formData.get('form-tuition')
            })
            //// enviar registro de usuario
            /*
                form-first-name
                form-last-name
                form-age
                form-tuition
            */
        },
        handleOpenRegister(e) {
            e.preventDefault();
            this.view = this.view ? 0 : 1
        }
    }
}
</script>
