<template>
<div>
    <main class="profile-page">
        <section class="relative block h-[500px]">
            <div class="absolute top-0 w-full h-full bg-center bg-cover" style="background-image: url('https://cdn.pixabay.com/photo/2018/03/06/19/33/nature-3204336_1280.jpg');">
            <span class="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
        </section>
        <section class="relative py-16">
            <div class="container mx-auto px-4">
                <div class="relative flex flex-col mx-auto min-w-0 break-words bg-white w-4/5 mb-6 shadow-xl rounded-lg -mt-64">
                    <div class="px-6">
                        <div class="flex flex-wrap justify-center">
                            <div class="w-full h-16 lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div class="relative">
                                    <div class="shadow-xl rounded-full bg-white text-black flex justify-center items-center border-none absolute -m-16 -ml-20 lg:-ml-16 w-[150px] h-[150px]">
                                        <i class="fas fa-user text-7xl opacity-70"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-12">
                            <h3 class="text-4xl font-semibold leading-normal mb-2">
                                {{storeSession.session.nombres}} 
                                <span class="block text-2xl">{{storeSession.session.apellidos}}</span>
                            </h3>
                            <div class="text-sm leading-normal mt-0 mb-2 font-bold uppercase">
                                {{storeSession.session.rol}}
                            </div>
                        </div>
                        <div class="mt-10 py-10 border-t text-center">
                            <div class="flex flex-wrap justify-center">
                                <div class="w-full lg:w-9/12 px-4">
                                    <p class="mb-4 text-lg leading-relaxed">
                                        An artist of considerable range, Jenna the name taken by
                                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                        performs and records all of his own music, giving it a
                                        warm, intimate feel with a solid groove structure. An
                                        artist of considerable range.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="relative pt-8 pb-6 mt-8">
                <div class="container mx-auto px-4">
                    <div class="flex flex-wrap items-center md:justify-between justify-center">
                        <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div class="text-sm text-blueGray-500 font-semibold py-1">
                                Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    </main>
</div>
</template>

<script>
import {useSession} from '@/stores/session';

export default {
    setup(){
        return {
            storeSession: useSession(),
        }
    },
}
</script>
