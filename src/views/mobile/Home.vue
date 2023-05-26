<template>
    <div class="w-full h-full relative phone:px-3 tablet:px-5 desktop:container desktop:mx-auto">
		<div class="mb-5 mt-5 px-2 w-full">
			<div class="flex flex-col">
				<span class="text-3xl font-extrabold">Comida</span>
				<span class="text-3xl font-normal opacity-90">Rápida</span>
			</div>
		</div>
		<div class="w-full h-full relative z-20">
			<div class="grid h-full w-full phone:grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-6 gap-3">
				<div v-for="(item,index) in items" :key="index" 
					class="h-52 relative bg-opacity-50 overflow-hidden rounded-3xl"
					:style="{backgroundColor: hexColor(item.color, 0.3)}">
					<div class="absolute flex flex-col top-0 left-0 right-0 m-3 z-10">
						<div class="font-extrabold w-16 py-2 rounded-md break-word">{{ item.name }}</div>
						<span class="text-xs">{{item.category}}</span>
					</div>
					<img class="w-96 z-0 absolute -bottom-3 -right-9 transform scale-125 rotate-12" :src="item.image" alt="">
					<div class="backdrop-blur-sm bg-white/60 absolute text-sm pr-1 bottom-1 left-3 right-3 rounded-3xl flex items-center z-10">
						<div class="w-full py-2 px-4">$ {{ item.price }}</div>
						<button class="w-16 h-7 bg-black text-white rounded-full">+</button>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer absolute overflow-hidden z-50 bottom-2 left-2 right-2 rounded-3xl h-20 bg-black">
			<div class="w-full h-full flex relative">
				<div class="w-20 flex justify-center items-center">
					<span class="bg-yellow-300 text-black w-8 h-8 text-sm font-bold rounded-full flex justify-center items-center">3</span>
				</div>
				<div style="width: calc((100% - 5rem) / 2);" class="flex flex-col justify-center">
					<span class="text-white text-lg">Cart</span>
					<span class="text-gray-500 text-sm transform -translate-y-0.5">1 Item</span>
				</div>
				<div style="width: calc((100% - 5rem) / 2);" class="flex transform translate-x-4 justify-center items-center">
					<div class="w-14 h-14 flex-shrink-0 bg-white rounded-full border-2 border-black p-2">
						<img class="w-full" src="https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464" alt="">
					</div>
					<div class="w-14 h-14 transform -translate-x-4 flex-shrink-0 bg-white rounded-full border-2 border-black p-2">
						<img class="w-full" src="https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464" alt="">
					</div>
					<div class="w-14 h-14 transform -translate-x-8 flex-shrink-0 bg-white rounded-full border-2 border-black p-2">
						<img class="w-full" src="https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464" alt="">
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
import {convertirColorHexadecimal} from '@/utils/colorHexadecimal';

export default {
	name: "home",
	data: () => ({
		items: [
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464",
				color: "#ffc701"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://epadelivery.com.mx/images/thumbs/0000080_sabritas-ruffles-queso-82gr_550.png",
				color: "#48a635"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464",
				color: "#ffc701"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://epadelivery.com.mx/images/thumbs/0000080_sabritas-ruffles-queso-82gr_550.png",
				color: "#48a635"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464",
				color: "#ffc701"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://epadelivery.com.mx/images/thumbs/0000080_sabritas-ruffles-queso-82gr_550.png",
				color: "#48a635"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464",
				color: "#ffc701"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://epadelivery.com.mx/images/thumbs/0000080_sabritas-ruffles-queso-82gr_550.png",
				color: "#48a635"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464",
				color: "#ffc701"
			},
			{
				name: "Dark Russet",
				category: "Chips",
				price: 80,
				image: "https://epadelivery.com.mx/images/thumbs/0000080_sabritas-ruffles-queso-82gr_550.png",
				color: "#48a635"
			}
		]
	}),	
	methods: {
		hexColor: convertirColorHexadecimal,
	}
}
</script>
