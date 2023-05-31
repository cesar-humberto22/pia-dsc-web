<template>
<div class="w-full pt-16">
    <div class="px-6 w-full">
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
                    <div class="py-6 px-6 grid grid-cols-2 gap-x-5">
                        <div v-for="(item, index) in form.filter((t) => !t.disabledForm)" :key="index" class="mb-4">
                            <template v-if="item.type === 'text' || item.type === 'number'">
                                <label class="block text-gray-700 text-sm font-bold mb-2" :for="item.name+'_'+(new Date().getTime()+index)">
                                    {{item.title}}
                                </label>
                                <input :value="!storeSession.session? '': storeSession.session[item.name]" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :id="item.name+'_'+(new Date().getTime()+index)" :name="item.name" :type="item.type" :placeholder="item.title">
                            </template>
                            <template v-else-if="item.type === 'option'">
                                <label class="block text-gray-700 text-sm font-bold mb-2" :for="item.name+'_'+(new Date().getTime()+index)">
                                    {{item.title}}
                                </label>
                                <select :value="!storeSession.session? '': storeSession.session[item.name]" :id="item.name+'_'+(new Date().getTime()+index)" :name="item.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block  bg-white focus:shadow-outline">
                                    <option value="" selected disabled>Selecciona una opción ...</option>
                                    <option v-for="(item_1, index_1) in item.options" :key="index_1">{{item_1}}</option>
                                </select>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    useSession
} from '../../stores/session';

export default {
    name: "Perfil",
    data: () => ({
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
    setup() {
        const storeSession = useSession();
        return {
            storeSession
        }
    },
}
</script>
