import { defineStore } from 'pinia'
import { apiFetch } from '../../utils/apiFetch';

export const useSession = defineStore('session', {
	state: () => {
		return {
			session: null /* {
                name: "Cesar Humberto",
                apellidos: "Gavilan Hernandez",
                matricula: 1990142,
                edad: 23.
                ip: 192.168.0.1,
                token: '',
                rol: ''
            }*/,
            isLogin: false,
            isLoading: true
		}
	},
	actions: {
        async getSession(callBack) {
			const localSession = localStorage.getItem("CAFETERIACONNECT@session") || btoa('{}');
            const localUndecoded = JSON.parse(atob(localSession)); 

            if(Object.keys(localUndecoded).length){
                const {response, error} = await apiFetch("usuarios/me", {
                    method: "GET"
                })
    
                if(error){
                    this.session = undefined
                    this.isLogin = false;
                }else{
                    this.session = response.response
                    this.isLogin = true;
                }
            }

            this.isLoading = false;
		},
        async changePassword(jsonData){
            const {error} = await apiFetch("usuarios/change-password", {
                method: "POST",
                body: JSON.stringify(jsonData)
            })

            if(error){
                return {
                    response: error.response,
                    statusLogin: false
                }
            }

            return this.login(jsonData)
        },
		async login(jsonData){
            const {response, error} = await apiFetch("usuarios/login", {
                method: "POST",
                body: JSON.stringify(jsonData)
            })

            if(error){
                return {
                    response: error.response,
                    statusLogin: false
                }
            }

            if(!response.response.token){
                return {
                    response: "Falla en token",
                    statusLogin: false
                }
            }

            localStorage.setItem("CAFETERIACONNECT@session", btoa(JSON.stringify(response.response.token)));

            this.isLogin = true;
            this.session = response.response;

            return {
                statusLogin: true
            }
		},
        async register(jsonData){
            const {response, error} = await apiFetch("usuarios/register", {
                method: "POST",
                body: JSON.stringify(jsonData)
            })

            if(error){
                return {
                    response: error.response,
                    statusLogin: false
                }
            }

            if(!response.response.id){
                return {
                    response: "Usuario no creado",
                    statusLogin: false
                }
            }

            return this.login({
                usuario: jsonData.tuition,
                password: ""
            })
		},
        logout(){
			localStorage.setItem("CAFETERIACONNECT@session", btoa("{}"));
            this.isLogin = false;
        }
	}
})
