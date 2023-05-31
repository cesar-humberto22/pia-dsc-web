<template>
<div class="w-full h-full p-5 flex min-h-full">
    <div class="px-3 py-8 bg-white w-full flex flex-col shadow-md">
        <div class="px-2 sm:flex sm:items-center sm:justify-between">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800">Usuarios registradas</h2>
                </div>
                <p class="mt-1 text-sm text-gray-500">Actualiza, crea, eliminar usuarios registrados en la plataforma.</p>
            </div>
            <div>
                <button @click="selectedData =undefined;useModalCreation = true;" class="flex items-center justify-center w-full h-full px-5 py-2 text-sm text-white tracking-wide transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
                    <i class="fas fa-plus mr-3"></i>
                    <span>Agregar usuario</span>
                </button>
            </div>
        </div>
        <br>
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th v-for="(item, index) in form" :key="index" scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        {{item.title}}
                    </th>
                    <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in listTable" :key="index">
                    <td v-for="(itemForm, index_1) in form" :key="index_1" class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <img v-if="itemForm.name === 'imagen'" />
                        <template v-else>
                            {{ isDate(item[itemForm.name])? dateFormat(new Date(item[itemForm.name]), 'yyyy-mm-dd HH:M:s') : item[itemForm.name]}}
                        </template>
                    </td>
                    <td>
                        <div class="w-full flex justify-center items-center space-x-2">
                            <button @click="selectedData = item; useModalCreation = true;" class="flex overflow-hidden items-center justify-center w-10 h-10 rounded-full text-sm text-white transition-colors duration-200 bg-orange-500 hover:bg-orange-600">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button @click="selectedData = item; useModalDelete = true;" class="flex overflow-hidden items-center justify-center w-10 h-10 rounded-full text-sm text-white transition-colors duration-200 bg-red-500 hover:bg-red-600">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <PortalsModal v-model:useModal="useModalCreation" width="50rem">
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex justify-between items-center p-5 rounded-t border-b">
                <h3 class="text-xl font-medium text-gray-900">
                    {{!selectedData? "Registrar": "Actualizar"}} usuario
                </h3>
            </div>
            <form @submit="handleSubmit" action="">
                <!-- Modal body -->
                <div class="py-6 px-6 grid grid-cols-2 gap-x-5">
                    <div v-for="(item, index) in form.filter((t) => !t.disabledForm)" :key="index" class="mb-4">
                        <template v-if="item.type === 'text' || item.type === 'number'">
                            <label class="block text-gray-700 text-sm font-bold mb-2" :for="item.name+'_'+(new Date().getTime()+index)">
                                {{item.title}}
                            </label>
                            <input :value="!selectedData? '': selectedData[item.name]" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="item.name+'_'+(new Date().getTime()+index)" :name="item.name" :type="item.type" :placeholder="item.title">
                        </template>
                        <template v-else-if="item.type === 'option'">
                            <label class="block text-gray-700 text-sm font-bold mb-2" :for="item.name+'_'+(new Date().getTime()+index)">
                                {{item.title}}
                            </label>
                            <select :value="!selectedData? '': selectedData[item.name]" :id="item.name+'_'+(new Date().getTime()+index)" :name="item.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block  bg-white focus:shadow-outline">
                                <option value="" selected disabled>Selecciona una opción ...</option>
                                <option v-for="(item_1, index_1) in item.options" :key="index_1">{{item_1}}</option>
                            </select>
                        </template>
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                    <button type="submit" class="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        {{!selectedData? "Guardar": "Actualizar"}}
                    </button>
                    <button @click="useModalCreation = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancelar</button>
                </div>
            </form>
        </div>
    </PortalsModal>

    <PortalsModal v-model:useModal="useModalDelete" width="30rem">
        <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div class="md:flex items-center">
                <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                    <i class="fas fa-trash text-2xl text-red-600"></i>
                </div>
                <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                    <p class="font-bold">Eliminar usuario</p>
                    <p class="text-sm text-gray-700 mt-1">Esta seguro de eliminar permanentemente la usuario ??
                    </p>
                </div>
            </div>
            <div class="text-center md:text-right mt-4 md:flex md:justify-end">
                <button @click="handleDelete" class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">Eliminar</button>
                <button @click="selectedData = undefined; useModalDelete = false;" class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
              md:mt-0 md:order-1">Cancelar</button>
            </div>
        </div>
    </PortalsModal>
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
    useToast
} from "vue-toastification";

import dateFormat from "dateformat";
import PortalsModal from '@/components/portals/Modal.vue';

export default {
    components: {
        PortalsModal
    },
    data: () => ({
        useModalCreation: false,
        useModalDelete: false,
        listTable: [],
        loadingTable: false,
        selectedData: undefined,
        form: [{
                name: "usuario",
                title: "Usuario",
                type: "text"
            },
            {
                name: "fechaRegistro",
                title: "Fecha Registro",
                type: "date",
                disabledForm: true
            },
            {
                name: "rol",
                title: "Rol",
                type: "option",
                options: ['Administrador', 'Estudiante', 'Empleado']
            },
            {
                name: "nombres",
                title: "Nombres",
                type: "text",
            },
            {
                name: "apellidos",
                title: "Apellidos",
                type: "text",
            },
            {
                name: "matricula",
                title: "Matricula",
                type: "text",
            },
            {
                name: "edad",
                title: "Edad",
                type: "number",
            }
        ]
    }),
    mounted() {
        this.loadData()
    },
    setup() {
        const toast = useToast();
        return {
            toast
        }
    },
    methods: {
        dateFormat,
        isDate,
        async handleSubmit(event) {
            event.preventDefault();

            if (this.selectedData) {
                const form = new FormData(event.target);
                const {
                    error
                } = await apiFetch("usuarios/" + this.selectedData.id, {
                    body: JSON.stringify(Object.fromEntries(form)),
                    method: "PUT"
                })

                if (error) {
                    console.error(error)
                    this.toast.error("Error al crear el registro");
                    return;
                }

                this.toast.success("Actualizado con éxito");
                this.useModalCreation = false;
                this.selectedData = undefined;
                this.loadData()
            } else {
                const form = new FormData(event.target);
                const {
                    error
                } = await apiFetch("usuarios/", {
                    body: JSON.stringify(Object.fromEntries(form)),
                    method: "POST"
                })

                if (error) {
                    console.error(error)
                    this.toast.error("Error al crear el registro");
                    return;
                }

                this.toast.success("Registro creado con éxito");
                this.useModalCreation = false;
                this.loadData()
            }
        },
        async handleDelete() {
            if (this.selectedData) {
                const {
                    error
                } = await apiFetch("usuarios/" + this.selectedData.id, {
                    method: "DELETE"
                })

                if (error) {
                    console.error(error)
                    this.toast.error("Error al eliminar el registro");
                    return;
                }

                this.toast.success("Registro eliminado con éxito");
                this.useModalDelete = false;
                this.loadData()
            }
        },
        async loadData() {
            this.loadingTable = true;
            const {
                response,
                error
            } = await apiFetch("usuarios/", {
                method: "GET"
            })

            this.loadingTable = false;

            if (error) {
                console.error(error)
                toast.error("Error al obtener los datos");
                return;
            }

            this.listTable = response.response
        }
    }
}
</script>
