<template>
    <main class="bg-slate-50 w-full h-full">
		<div class="w-full h-full relative z-20">
			<div class="grid h-full w-full grid-cols-2 gap-3">
				<div class="h-52 relative bg-yellow-300 bg-opacity-50 overflow-hidden rounded-3xl">
					<div class="absolute flex flex-col top-0 left-0 right-0 m-3 z-10">
						<div class="font-extrabold w-16 py-2 rounded-md break-word">Dark Russet</div>
						<span class="text-xs">Chips</span>
					</div>
					<img class="w-96 z-0 absolute -bottom-3 -right-9 transform scale-125 rotate-12" src="https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7501011115613.png?v=1626772464" alt="">
					<div class="backdrop-blur-xl bg-white/70 absolute text-sm pr-1 bottom-1 left-3 right-3 rounded-3xl flex items-center z-10">
						<div class="w-full py-2 px-4">$ 08.00</div>
						<button class="w-16 h-7 bg-black text-white rounded-full">+</button>
					</div>
				</div>
				<div class="h-52 relative bg-green-300 bg-opacity-50 overflow-hidden rounded-3xl">
					<div class="absolute flex flex-col top-0 left-0 right-0 m-3 z-10">
						<div class="font-extrabold w-16 py-2 rounded-md break-word">Dark Russet</div>
						<span class="text-xs">Chips</span>
					</div>
					<img class="w-96 z-x0 absolute -bottom-3 -right-9 transform scale-125 rotate-12" src="https://epadelivery.com.mx/images/thumbs/0000080_sabritas-ruffles-queso-82gr_550.png" alt="">
					<div class="backdrop-blur-xl bg-white/70 absolute text-sm pr-1 bottom-1 left-3 right-3 rounded-3xl flex items-center z-10">
						<div class="w-full py-2 px-4">$ 08.00</div>
						<button class="w-16 h-7 bg-black text-white rounded-full">+</button>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer fixed overflow-hidden z-50 bottom-2 left-2 right-2 rounded-3xl h-20 bg-black">
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
	</main>
</template>

<script setup></script>
