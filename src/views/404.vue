<template>
<!-- component -->
<div class="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-bottom error-bg">
    <div class="container">
        <div class="flex flex-col space-y-4 justify-center items-center offset-sm-2 text-gray-50 text-center -mt-52">
            <div class="relative">
                <h1 class="relative text-9xl tracking-tighter-less text-shadow text-primary-500 font-sans font-bold">
                    <span>4</span><span>0</span><span>4</span>
                </h1>
            </div>
            <h5 class="text-gray-300 font-semibold">Pagina no encontrada</h5>
            <button @click="handleHome" class="bg-primary-400 cursor-pointer w-28 px5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
                Ir al inicio
            </button>
        </div>
    </div>
</div>
</template>

<style>
.tracking-tighter-less {
    letter-spacing: -0.75rem;
}

.text-shadow {
    text-shadow: -8px 0 0 rgb(255 112 67 / 0.3);
}
</style>


<script>
import {usePlatForm} from '@/stores/platform';

export default {
    name: '404',
    setup(){
		const platForm = usePlatForm()
		return {
			url: platForm.url
		}
	},
    methods: {
        handleHome(){
            this.$router.push(this.url+'/home')
        }
    }
}
</script>