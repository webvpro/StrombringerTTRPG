import { createApp } from 'vue'
import firebase from 'firebase'
import VueFriendlyIframe from 'vue-friendly-iframe';

import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'


/* code from our Firebase console */
var firebaseConfig ={
  apiKey: "AIzaSyDzpLjTCSF1FIG8_EuNQFCseQ_P-78rjS0",
  authDomain: "ttrpgoverlays.firebaseapp.com",
  databaseURL: "https://ttrpgoverlays-default-rtdb.firebaseio.com",
  projectId: "ttrpgoverlays",
  storageBucket: "ttrpgoverlays.appspot.com",
  messagingSenderId: "556447931975",
  appId: "1:556447931975:web:a6594c9434ab7d5eb35b62"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)


const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.component('vue-friendly-iframe', VueFriendlyIframe.VueFriendlyIframe)
app.use(router)
app.mount('#app')
