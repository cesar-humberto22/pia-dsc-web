<template>
    <div class="w-full h-full overflow-y-auto overflow-x-auto p-5">
        <div class="space-y-3">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800">Historial</h2>
                </div>
                <p class="mt-1 text-sm text-gray-500">Visualiza el historial de pedidos realizados.</p>
            </div>
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th v-for="(item, index) in listItemsTable" :key="index" scope="col" class="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400">
                            {{item.title}}
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="listVentas.length > 0" v-for="(item, index) in listVentas" :key="index">
                        <td v-for="(itemForm, index_1) in listItemsTable" :key="index_1" class="px-4 text-center py-4 text-sm font-medium whitespace-nowrap">
                            {{ isDate(item[itemForm.name])? dateFormat(new Date(item[itemForm.name]), 'yyyy-mm-dd') : item[itemForm.name]}}
                        </td>
                    </tr>
                    <tr v-else-if="listVentas.length === 0">
                        <td :colspan="listItemsTable.length" class="w-full">
                            <div class="flex w-full justify-center items-center h-24">
                                Sin registros
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import {
    apiFetch
} from '../../utils/apiFetch';
import {
    isDate
} from '../../utils/isDate';
import {
    useSession
} from '../../stores/session';

import dateFormat from "dateformat";

export default {
    data: () => ({
        fechaFiltro: new Date().toISOString().slice(0,10),
        selectedIsLoading: false,
        listVentas: [],
        listItemsTable: [
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
    setup() {
        const storeSession = useSession();
        return { storeSession }
    },
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
                    fecha: this.fechaFiltro,
                    idUsuario: this.storeSession.session.id
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