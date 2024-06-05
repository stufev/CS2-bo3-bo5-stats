import './assets/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-dark-teal/theme.css'

import App from './App.vue'
import router from './router'
import {projectAuth} from "@/firebase/config.js";

let app

projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)

        app.use(createPinia())
        app.use(router)
        app.use(PrimeVue)

        app.mount('#app')
    }
})


