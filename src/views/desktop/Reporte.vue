<template>
    <div class="w-full relative p-5 flex min-h-full">
        <div class="w-full px-3 py-2 bg-white flex flex-col shadow-md">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div class="flex items-center gap-x-3">
                        <h2 class="text-lg font-medium text-gray-800">Reporte de ventas</h2>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">Visualiza el seguimiento de las ventas.</p>
                </div>
            </div> 
            <div class="p-2">
                <div class="w-52">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="fecha_filtro">
                        Fecha de filtro
                    </label>
                    <input v-model="fechaFiltro" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fecha_filtro" name="fecha_filtro" type="date">
                </div>
                <div class="flex flex-col space-y-5 w-full h-full px-5 py-4">
                    <div class="w-full flex space-x-4">
                        <div class="p-2 w-48 py-8 border border-gray-200 space-y-1 shadow-md rounded-md  flex flex-col justify-center items-center">
                            <span class="text-3xl font-extrabold">{{getConteoVentas}}</span>
                            <span class="text-sm font-bold opacity-80"># ventas</span>
                        </div>
                        <div class="p-2 w-48 py-8 border border-gray-200 space-y-1 shadow-md rounded-md  flex flex-col justify-center items-center">
                            <span class="text-3xl font-extrabold">$ {{getVentaTotal}}</span>
                            <span class="text-sm font-bold opacity-80">Ventas totales</span>
                        </div>
                    </div>
                    <div>
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th v-for="(item, index) in listItemsTable" :key="index" scope="col" class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                                        {{item.title}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(item, index) in listVentas" :key="index">
                                    <td v-for="(itemForm, index_1) in listItemsTable" :key="index_1" class="px-4 text-center py-4 text-sm font-medium whitespace-nowrap">
                                        {{ isDate(item[itemForm.name])? dateFormat(new Date(item[itemForm.name]), 'yyyy-mm-dd') : item[itemForm.name]}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    apiFetch, URL_API
} from '../../utils/apiFetch';
import {
    isDate
} from '../../utils/isDate';

import dateFormat from "dateformat";

export default {
    data: () => ({
        fechaFiltro: new Date().toISOString().slice(0,10),
        selectedIsLoading: false,
        listVentas: [],
        listItemsTable: [{
                name: "fechaEmision",
                title: "fecha emisión",
                type: "date",
            },
            {
                name: "fechaRegistro",
                title: "fecha de registro",
                type: "date",
            },
            {
                name: "subtotal",
                title: "Subtotal",
                type: "number",
            },
            {
                name: "iva",
                title: "IVA 16%",
                type: "number",
            },
            {
                name: "total",
                title: "Total",
                type: "number",
            },
        ]
    }),
    mounted(){
        this.loadData()
    },
    methods: {
        dateFormat,
        isDate,
        async loadData() {
            this.selectedIsLoading = true;
            const {
                response,
                error
            } = await apiFetch("ventas/?"+ new URLSearchParams({
                    fecha: this.fechaFiltro
                }), {
                method: "GET"
            })

            this.selectedIsLoading = false;

            if (error) {
                console.error(error)
                toast.error("Error al obtener los datos");
                return;
            }

            this.listVentas = response.response
        },
    },
    computed: {
        getVentaTotal(){
            return this.listVentas.reduce((current, value) => {
                current += parseFloat(value.total)
                return current
            }, 0)
        },
        getConteoVentas(){
            return this.listVentas.length
        }
    }
}
</script>