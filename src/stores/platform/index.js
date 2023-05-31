import { defineStore } from 'pinia'

export const PLATFORMDESKTOP = "DESKTOP";
export const PLATFORMMOBILE = "MOBILE";

export const URLDESKTOP = "/desktop";
export const URLMOBILE = "/mobile";

export const usePlatForm = defineStore('platform', {
	state: () => {
		return {
			platform: null,
			url: null
		}
	},
	actions: {
		platformDetect() {
			const platform = "" /* window.navigator?.userAgentData?.platform || window.navigator.platform*/,
				windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
			let aux_platform;
			if (windowsPlatforms.indexOf(platform) !== -1) {
				this.platform = PLATFORMDESKTOP;
				this.url = URLDESKTOP
			} else {
				this.platform = PLATFORMMOBILE;
				this.url = URLMOBILE
			}

			
			const localPlatform = localStorage.getItem("CAFETERIACONNECT@platform");
			if(localPlatform){
				this.platform = localPlatform
				this.url = localPlatform === PLATFORMDESKTOP? URLDESKTOP : URLMOBILE
			}
		},
		setPlatform(platform){
			localStorage.setItem("CAFETERIACONNECT@platform", platform? platform: this.platform);
		},
		deletePlatform(){
			localStorage.removeItem("CAFETERIACONNECT@platform");
		}
	}
})
