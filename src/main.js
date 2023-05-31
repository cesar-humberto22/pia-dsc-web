import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import PortalVue from 'portal-vue'
import App from '@/App.vue'
import router from '@/router'

import '@/styles/index.css'
import '@/styles/app.css'
import "vue-toastification/dist/index.css";

const options = {
    position: "bottom-right",
    timeout: 3010,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

createApp(App)
.use(PortalVue)
.use(Toast, options)
.use(router)
.use(createPinia())
.mount('#app')