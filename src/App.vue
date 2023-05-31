<template>
	<Loading :enable="storeSession.isLoading" :key="(new Date()).getTime()" />
	<main v-if="!storeSession.isLoading" class="app">
		<template v-if="storeSession.isLogin">
			<LayoutsDesktop v-if="storePlatForm.platform === PLATFORMDESKTOP">
				<router-view></router-view>
			</LayoutsDesktop>
			<LayoutsMobile v-else-if="storePlatForm.platform === PLATFORMMOBILE">
				<router-view></router-view>
			</LayoutsMobile>
		</template>
		<router-view v-else></router-view>
	</main>
	<portal-target name="body"></portal-target>
</template>

<script>
import Loading from '@/components/Loading.vue';
import LayoutsDesktop from '@/components/layouts/Desktop.vue';
import LayoutsMobile from '@/components/layouts/Mobile.vue';

import {usePlatForm, PLATFORMDESKTOP, PLATFORMMOBILE} from '@/stores/platform';
import {useSession} from '@/stores/session';

import 'animate.css';

export default {
	name: "app",
	components: {
		Loading,
		LayoutsDesktop,
		LayoutsMobile
	},
	data: () => ({
		PLATFORMDESKTOP, PLATFORMMOBILE
	}),
	setup(){
		const platForm = usePlatForm()
		const session = useSession()
		platForm.platformDetect()
		return {
			storeSession: session,
			storePlatForm: platForm
		}
	},
	async mounted(){
		await this.storeSession.getSession()

		if(!this.storeSession.isLogin && !this.storeSession.isLoading && this.$route.fullPath !== "/login"){
            this.$router.push("/login")
		}

		//console.log({isLoading: this.session.isLoading})
		//this.isLoading = this.session.isLoading
	}
}
</script>