<template>
<div class="py-5">
    <div>
        <div class="px-5 mb-3">
            <div class="flex items-center gap-x-3">
                <h2 class="text-lg font-medium text-gray-800">Mi carrito</h2>
            </div>
            <p class="mt-1 text-sm text-gray-500">Visualiza tus ventas en carrito.</p>
        </div>
        <div class="overflow-hidden border border-gray-200 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                            Producto
                        </th>

                        <th scope="col" class="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                            Cantidad
                        </th>

                        <th scope="col" class="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                            Precio
                        </th>

                        <th scope="col" class="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                            Subtotal
                        </th>

                        <th scope="col" class="relative py-3.5 px-4">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="storeCarrito.listItemsCarrito.length > 0" v-for="(item, index) in storeCarrito.listItemsCarrito" :key="item.id">
                        <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                            <div class="flex flex-col items-center justify-start">
                                <img :src="URL_API+'/productos/img/'+item.producto.id" class="w-16" alt="" srcset="">
                                <span>
                                    {{item.producto.nombre}}
                                </span>
                                <span>
                                    {{item.producto.unidad}}
                                </span>
                            </div>
                        </th>
                        <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                            <div class="flex items-center justify-center">
                                <button @click="storeCarrito.handleCantidad(item.id, -1)" class="w-5 h-5 text-xs text-white mx-2 rounded-md bg-red-600"><i class="fas fa-minus"></i></button>
                                <div class="w-12 h-6 flex justify-center items-center rounded-md border border-gray-400">{{item.cantidad}}</div>
                                <button @click="storeCarrito.handleCantidad(item.id, 1)" class="w-5 h-5 text-xs text-white mx-2 rounded-md bg-red-600"><i class="fas fa-plus"></i></button>
                            </div>
                        </th>

                        <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                            {{item.producto.precio}}
                        </th>

                        <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                            {{parseInt(item.producto.precio) * parseInt(item.cantidad)}}
                        </th>

                        <th scope="col">
                            <span class="cursor-pointer" @click="() => deleteCarItem(item.id)"><i class="far fa-trash-alt"></i></span>
                        </th>
                    </tr>
                    <tr v-else-if="storeCarrito.listItemsCarrito.length === 0">
                        <td colspan="6">
                            <div class="w-full h-44 flex justify-center items-center">
                                SIN DATOS
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="flex justify-center items-center pt-8">
        <div class="w-[21.5rem] flex flex-col">
            <div class="spikes relative bg-white"></div>
            <div class="flex flex-col w-full h-full shadow-lg">
                <div class="bg-primary-500 w-full h-32 flex justify-center items-center pt-3">
                    <span class="text-2xl text-white font-bold">$ {{storeCarrito.getDinero + (storeCarrito.getDinero * 0.16)}}</span>
                </div>
                <div class="w-full p-5 h-full flex flex-col">
                    <div class="h-full mb-4 flex flex-col space-y-2 justify-end items-center">
                        <div class="border border-gray-200 w-full"></div>
                        <div class="flex w-full px-2">
                            <div class="w-1/2 text-left">Subtotal</div>
                            <div class="w-1/2">$ {{ storeCarrito.getDinero }}</div>
                        </div>
                        <div class="flex w-full px-2">
                            <div class="w-1/2 text-left">IVA (16%)</div>
                            <div class="w-1/2">$ {{ storeCarrito.getDinero * 0.16 }}</div>
                        </div>
                        <div class="flex w-full px-2">
                            <div class="w-1/2 text-left">Total</div>
                            <div class="w-1/2">$ {{ storeCarrito.getDinero + (storeCarrito.getDinero * 0.16) }}</div>
                        </div>
                    </div>
                    <button @click="handleSubmitVenta" :disabled="storeCarrito.getDinero <= 0" class="shadow-sm w-full rounded-md py-2 px-4 text-center bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40 text-white enabled:hover:bg-primary-700">Terminar venta</button>

                    <button @click="storeCarrito.clear()" :disabled="storeCarrito.getDinero <= 0" class="shadow-sm mt-3 w-full rounded-md py-2 px-4 text-center bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40 text-white enabled:hover:bg-gray-700">
                        {{ storeCarrito.listItemsCarrito.length }} productos en el carrito
                    </button>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
.spikes::after {
    content: "";
    position: absolute;
    right: 0px;
    left: 0px;
    z-index: 1;
    display: block;
    height: 28px;
    background-size: 28px 100%;
    background-image: linear-gradient(135deg, white 25%, transparent 25%), linear-gradient(225deg, white 25%, transparent 25%);
    background-position: 40px 0px;
}
</style>

<script>
import {
    apiFetch,
    URL_API
} from '../../utils/apiFetch';
import {
    useCarrito
} from '../../stores/carrito/index';
import {
    useSession
} from '../../stores/session/index';
import {
    useToast
} from "vue-toastification";


export default {
    name: "MiCarrito",
    setup() {
        return {
            toast: useToast(),
            storeSession: useSession(),
            storeCarrito: useCarrito()
        }
    },
    data: () => ({
        URL_API
    }),
    methods: {
        async handleSubmitVenta(){
            const {
                error
            } = await apiFetch("ventas/", {
                body: JSON.stringify({
                    idUsuario: this.storeSession.session.id,
                    fechaEmision: new Date().toISOString().slice(0,10),
                    carrito: this.storeCarrito.listItemsCarrito,
                    iva: 0.16,
                    ivaSubtotal: this.storeCarrito.getDinero * 0.16,
                    total: this.storeCarrito.getDinero + (this.storeCarrito.getDinero * 0.16),
                    subtotal: this.storeCarrito.getDinero,

                }),
                method: "POST"
            })

            if (error) {
                console.error(error)
                this.toast.error("Error al crear el registro");
                return;
            }

            this.toast.success("Venta registrada con éxito");
            this.storeCarrito.clear()
           
        }
    }
}
</script>
