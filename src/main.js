import { createApp } from 'vue'
import App from './App.vue'
import UseFirebase from '@/stores/firebase/'
import firebaseConfig from '../firebase.config.js'//
import router from './router'
import './tailwind.css'

console.log(firebaseConfig)

const app = createApp(App)
app.use(UseFirebase, firebaseConfig)
app.use(router)
app.mount('#app')