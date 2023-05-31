<template>
<div class="absolute left-0 right-0 bottom-0 flex flex-col top-16 desktop:container desktop:mx-auto">
    <div class="mb-5 mt-5 px-6 w-full">
        <div class="flex flex-col">
            <span class="text-3xl font-extrabold">Productos</span>
        </div>
    </div>
    <div class="w-full h-full px-5 relative z-20 overflow-y-auto">
        <div class="grid h-full w-full pb-14 phone:grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-6 gap-3">
            <div v-for="(item,index) in listItems" :key="index" class="h-52 relative bg-opacity-50 overflow-hidden rounded-3xl" :style="{backgroundColor: hexColor(item.color, 0.3)}">
                <div class="absolute flex flex-col top-0 left-0 right-0 m-3 z-10">
                    <div class="font-extrabold w-16 py-2 rounded-md break-word">{{ item.nombre }}</div>
                    <span class="text-xs">{{item.categoria.categoria}}</span>
                </div>
                <img class="w-96 z-0 absolute -bottom-3 -right-9 transform scale-125 rotate-12" :src="item.image" alt="">
                <div class="backdrop-blur-sm bg-white/60 absolute text-sm pr-1 bottom-1 left-3 right-3 rounded-3xl flex items-center z-10">
                    <div class="w-full py-2 px-4">$ {{ item.precio }}</div>
                    <button @click="storeCarrito.addItem(item, 1)" class="w-16 h-7 bg-black text-white rounded-full">+</button>
                </div>
            </div>
			<div class="h-80 w-full"></div>
        </div>
    </div>
    <footer class="footer absolute overflow-hidden z-50 bottom-1 left-2 right-2 rounded-3xl h-20 bg-black">
        <div class="w-full h-full flex relative">
            <div class="w-20 flex justify-center items-center">
                <span class="bg-secondary-300 text-black w-8 h-8 text-sm font-bold rounded-full flex justify-center items-center">{{ storeCarrito.listItemsCarrito.length }}</span>
            </div>
            <div style="width: calc((100% - 5rem) / 2);" class="flex flex-col justify-center">
                <span class="text-white text-lg">Mi carrito</span>
                <span class="text-gray-500 text-sm transform -translate-y-0.5">$ {{storeCarrito.getDinero}}</span>
            </div>
            <div style="width: calc((100% - 5rem) / 2);" class="flex transform translate-x-4 justify-center items-center">
				<button @click="$router.push('/mobile/mi-carrito')" :disabled="storeCarrito.getDinero <= 0" class="shadow-sm rounded-full py-2 px-4 text-center bg-secondary-600 disabled:cursor-not-allowed disabled:opacity-40 text-white enabled:hover:bg-secondary-700">Ir al carrito</button>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import {
    apiFetch,
    URL_API
} from '../../utils/apiFetch';
import {
    useCarrito
} from '../../stores/carrito/index';

import {
    convertirColorHexadecimal
} from '@/utils/colorHexadecimal';

export default {
    name: "home",
    data: () => ({
        listItems: [],
        selectedIsLoading: true,
    }),
    setup() {
        return {
            storeCarrito: useCarrito()
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        hexColor: convertirColorHexadecimal,
        async loadData() {
            this.selectedIsLoading = true;
            const {
                response,
                error
            } = await apiFetch("productos/", {
                method: "GET"
            })
            this.selectedIsLoading = false;

            if (error) {
                console.error(error)
                toast.error("Error al obtener los datos");
                return;
            }

            this.listItems = response.response.filter((t) => t.num_inventario > 0).map((t) => ({
                image: URL_API + '/productos/img/' + t['id'],
                ...t
            }))
        },
    },
}
</script>
