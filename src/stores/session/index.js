import { defineStore } from 'pinia'

export const useSession = defineStore('session', {
	state: () => {
		return {
			session: null /* {
                name: "Cesar Humberto",
                apellidos: "Gavilan Hernandez",
                matricula: 1990142,
                edad: 23.
                ip: 192.168.0.1,
                token: ''
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
                const dataFetch = await fetch("https://www.google.com/", {
                    mode: 'no-cors'
                })
                this.isLogin = true;
            }

            this.isLoading = false;
		},
		login(jsonData){
			localStorage.setItem("CAFETERIACONNECT@session", btoa(JSON.stringify(jsonData)));
            this.isLogin = true;
		},
        register(jsonData){
			localStorage.setItem("CAFETERIACONNECT@session", btoa(JSON.stringify(jsonData)));
            this.isLogin = true;
		},
        logout(){
			localStorage.setItem("CAFETERIACONNECT@session", btoa("{}"));
            this.isLogin = false;
        }
	}
})
