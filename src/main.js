import { createApp } from 'vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as GiIcons from "oh-vue-icons/icons/gi";


import App from './App.vue'
//import UseFirebase from '@/stores/firebase/'
//import firebaseConfig from '../firebase.config.js'//
import router from './router'
import './tailwind.css'

const Gi = Object.values({ ...GiIcons });
addIcons(...Gi);

const app = createApp(App)
app.component("v-icon", OhVueIcon);
//app.use(UseFirebase, firebaseConfig)
app.use(router)
app.mount('#app')