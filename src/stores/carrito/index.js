import { defineStore } from 'pinia'

export const useCarrito = defineStore('carrito', {
	state: () => {
		return {
            listItemsCarrito: [] 
			/*
				id: null,
                producto: null,
                cantidad: null,
			**/
		}
	},
	actions: {
		addItem(item, cantidad){
			if(parseInt(cantidad) <= 0){
                return;
            }

            if(parseInt(cantidad) > parseInt(item.num_inventario))
                cantidad = item.num_inventario

			this.listItemsCarrito = [...this.listItemsCarrito, {
				id: (new Date()).getTime(),
				producto: item,
				cantidad
			}]
		},
		deleteCarItem(id){
            this.listItemsCarrito = [...this.listItemsCarrito.filter((t) => t.id !== id)]
        },
        handleCantidad(id, difference){
            const findIndex = this.listItemsCarrito.findIndex((t) => t.id === id)
            const aux_incremente = parseInt(this.listItemsCarrito[findIndex].cantidad) + difference;
            if(aux_incremente >= 0 && aux_incremente <= parseInt(this.listItemsCarrito[findIndex].producto.num_inventario)){
                this.listItemsCarrito[findIndex].cantidad = aux_incremente
                this.listItemsCarrito = [...this.listItemsCarrito]
            }
        },
		clear(){
			this.listItemsCarrito = []
		}
	},
	getters: {
		getDinero(){
            return this.listItemsCarrito.reduce((current, value) => {
                current += parseInt(value.producto.precio) * parseInt(value.cantidad)
                return current
            }, 0)
        }
	}
})
