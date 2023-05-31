<template>
<div class="w-full relative p-5 flex min-h-full">
    <div style="width: calc(100% - 25rem);" class="px-3 py-8 bg-white flex flex-col shadow-md">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800">Venta de productos</h2>
                </div>
                <p class="mt-1 text-sm text-gray-500">Busca los productos y agrégalo al carrito</p>
            </div>
        </div>  

        <div class="mt-6 md:flex md:items-center md:justify-between">
            <label class="w-1/2 px-2">
                <span class="px-2">Producto</span>
                <VueMultiselect v-model="temporalForm.producto" placeholder="Buscar producto ..." :options="options" :searchable="true" :loading="selectedIsLoading" :internalSearch="false" :clear-on-select="false" :close-on-select="false" :options-limit="300" :limit="3" @search-change="handleAsyncFind" :custom-label="customLabel">
                    <template #noResult>
                        Producto no encontrado
                    </template>
                </VueMultiselect>
            </label>
            <div class="w-1/2 flex h-full">
                <label class="w-1/2 flex-shrink-0 h-full flex flex-col">
                    <span class="px-2">Cantidad</span>
                    <input type="number" v-model="temporalForm.cantidad" :disabled="temporalForm.producto === null" placeholder="cantidad" class="block w-full h-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 px-3 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 disabled:opacity-50 disabled:cursor-not-allowed">
                </label>
                <div class="w-1/2 flex-shrink-0 h-full pt-6 flex justify-end">
                    <button @click="handleAddCard" :disabled="temporalForm.producto === null" class="flex items-center justify-center w-full h-full px-5 py-2 text-sm text-white tracking-wide transition-colors duration-200 disabled:cursor-not-allowed bg-primary-500 rounded-lg shrink-0 sm:w-auto enabled:hover:bg-primary-600 disabled:opacity-50">
                        <i class="fas fa-shopping-cart mr-3"></i>
                        <span>Agregar al carrito</span>
                    </button>
                </div>
            </div>
        </div>

        <!--
        <div class="mt-6 md:flex md:items-center md:justify-between">
            <div class="relative flex items-center mt-4 md:mt-0">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <input type="text" placeholder="Buscar producto ..." class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
            </div>
        </div>
        -->

        <div class="flex flex-col mt-6">
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full py-2 align-middle">
                    <div class="overflow-hidden border border-gray-200 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                                        Producto
                                    </th>

                                    <th scope="col" class="px-4 py-3.5 text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                                        Unidad
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
                                <tr v-for="(item, index) in carrito" :key="item.id">
                                    <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                                        <div class="flex items-center justify-start">
                                            <img :src="URL_API+'/productos/img/'+item.producto.id" class="w-16" alt="" srcset="">
                                            <span>
                                                {{item.producto.nombre}}
                                            </span>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                                        {{item.producto.unidad}}
                                    </th>
                                    <th scope="col" class="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                                        <div class="flex items-center justify-center">
                                            <button @click="handleCantidad(item.id, -1)" class="w-5 h-5 text-xs text-white mx-2 rounded-md bg-red-600"><i class="fas fa-minus"></i></button>
                                            <div class="w-12 h-6 flex justify-center items-center rounded-md border border-gray-400">{{item.cantidad}}</div>
                                            <button @click="handleCantidad(item.id, 1)" class="w-5 h-5 text-xs text-white mx-2 rounded-md bg-red-600"><i class="fas fa-plus"></i></button>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="relative flex-shrink-0 h-screen">
        <div class="w-[21.5rem] fixed flex flex-col bottom-4 right-10 top-24">
            <div class="spikes relative bg-white"></div>
            <div class="flex flex-col w-full h-full shadow-lg">
                <div class="bg-primary-500 w-full h-32 flex justify-center items-center pt-3">
                    <span class="text-2xl text-white font-bold">$ {{getDinero + (getDinero * 0.16)}}</span>
                </div>
                <div class="w-full p-5 h-full flex flex-col">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="fecha_emision">
                            Fecha de emisión
                        </label>
                        <input v-model="fechaEmision" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fecha_emision" name="fecha_emision" type="date">
                    </div>
                    <div class="h-full mb-4 flex flex-col space-y-2 justify-end items-center">
                        <div class="border border-gray-200 w-full"></div>
                        <div class="flex w-full px-2">
                            <div class="w-1/2 text-left">Subtotal</div>
                            <div class="w-1/2">$ {{ getDinero }}</div>
                        </div>
                        <div class="flex w-full px-2">
                            <div class="w-1/2 text-left">IVA (16%)</div>
                            <div class="w-1/2">$ {{ getDinero * 0.16 }}</div>
                        </div>
                        <div class="flex w-full px-2">
                            <div class="w-1/2 text-left">Total</div>
                            <div class="w-1/2">$ {{ getDinero + (getDinero * 0.16) }}</div>
                        </div>
                    </div>
                    <button @click="handleSubmitVenta" :disabled="getDinero <= 0" class="shadow-sm w-full rounded-md py-2 px-4 text-center bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40 text-white enabled:hover:bg-primary-700">Terminar venta</button>

                    <button @click="carrito = []" :disabled="getDinero <= 0" class="shadow-sm mt-3 w-full rounded-md py-2 px-4 text-center bg-gray-600 disabled:cursor-not-allowed disabled:opacity-40 text-white enabled:hover:bg-gray-700">
                        {{ carrito.length }} productos en el carrito
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
    apiFetch, URL_API
} from '../../utils/apiFetch';
import {
    useSession
} from '../../stores/session';
import {
    useToast
} from "vue-toastification";

import VueMultiselect from 'vue-multiselect'

import 'vue-multiselect/dist/vue-multiselect.css'

export default {
    components: { VueMultiselect },
    data: () => ({
        URL_API,
        fechaEmision: undefined,
        temporalForm: {
            id: null,
            producto: null,
            cantidad: null,
        },
        formSelected: null,
        selectedIsLoading: false,
        options: [],
        carrito: []
    }),
    setup() {
        const toast = useToast();
        const storeSession = useSession();
        return {
            toast,
            storeSession
        }
    },
    mounted(){
        this.loadData("")
    },
    methods: {
        customLabel ({ title, price }) {
            return `${title} $${price}`
        },
        handleAddCard () {
            if(parseInt(this.temporalForm.cantidad) <= 0){
                return;
            }

            if(parseInt(this.temporalForm.cantidad) > parseInt(this.temporalForm.producto.num_inventario))
                this.temporalForm.cantidad = this.temporalForm.producto.num_inventario

            this.carrito = [...this.carrito, {...this.temporalForm, id: (new Date()).getTime()}]
            this.temporalForm = {
                id: null,
                producto: null,
                cantidad: null,
            }

            this.loadData("");
        },
        deleteCarItem(id){
            this.carrito = [...this.carrito.filter((t) => t.id !== id)]
            this.loadData("");
        },
        handleCantidad(id, difference){
            const findIndex = this.carrito.findIndex((t) => t.id === id)
            const aux_incremente = parseInt(this.carrito[findIndex].cantidad) + difference;
            if(aux_incremente >= 0 && aux_incremente <= parseInt(this.carrito[findIndex].producto.num_inventario)){
                this.carrito[findIndex].cantidad = aux_incremente
                this.carrito = [...this.carrito]
            }
        },
        handleAsyncFind(event){
            this.loadData(event)
        },
        async loadData(search) {
            this.selectedIsLoading = true;
            const {
                response,
                error
            } = await apiFetch("productos/?"+ new URLSearchParams({
                    limit: 30,
                    search
                }), {
                method: "GET"
            })

            this.selectedIsLoading = false;

            if (error) {
                console.error(error)
                toast.error("Error al obtener los datos");
                return;
            }

            const listProductSelected = this.carrito.reduce((current, value) => {
                if(!current.includes(value.producto.id))
                    current = [...current, value.producto.id]

                return current
            }, [])

            this.options = response.response.filter((t) => t.num_inventario > 0).map((t) => ({
                title: t.nombre, price: t.precio, img: URL_API+'/productos/img/'+t['id'], ...t
            })).filter((t) => !listProductSelected.includes(t.id))
        },
        async handleSubmitVenta(){
            if (this.fechaEmision) {
                const {
                    error
                } = await apiFetch("ventas/", {
                    body: JSON.stringify({
                        idUsuario: this.storeSession.session.id,
                        fechaEmision: this.fechaEmision,
                        carrito: this.carrito,
                        iva: 0.16,
                        ivaSubtotal: this.getDinero * 0.16,
                        total: this.getDinero + (this.getDinero * 0.16),
                        subtotal: this.getDinero,

                    }),
                    method: "POST"
                })

                if (error) {
                    console.error(error)
                    this.toast.error("Error al crear el registro");
                    return;
                }

                this.toast.success("Venta registrada con éxito");
                this.fechaEmision = undefined;
                this.temporalForm = {
                    id: null,
                    producto: null,
                    cantidad: null,
                };
                this.carrito = []
                this.loadData("")
            }else{
                this.toast.info("Ingresa una fecha de emisión");
                return;
            }
        }
    },
    computed: {
        getDinero(){
            return this.carrito.reduce((current, value) => {

                current += parseInt(value.producto.precio) * parseInt(value.cantidad)

                return current
            }, 0)
        }
    }
}
</script>
