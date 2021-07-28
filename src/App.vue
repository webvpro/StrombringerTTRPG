<script setup>
  import { ref, watchEffect } from 'vue'
  import { useRouter, useRoute} from 'vue-router'
  import firebase from 'firebase';
  import PageHeader from '@/components/PageHeader.vue';
  const router = useRouter();
  const route = useRoute();
  const isLoggedIn = ref(false) ;
  
  firebase.auth().onAuthStateChanged(function(user) {
      if (!user) { // not logged in
          console.log('no auth')
          isLoggedIn.value = false;
          if (route.meta.secure) {
            router.push({path: '/login', name: "login", params: { returnPath: route.path }})
          }
      } else {
        isLoggedIn.value = true
      }
  });
</script>
<template>
  <div class="h-full w-full flex flex-col flex-nowrap flex-grow">
    <header class="bg-indigo-900 shadow" v-if="$route.meta.title">
      <PageHeader :isLoggedIn="isLoggedIn"/>
    </header>
    <div class="flex-grow flex flex-col">
      <router-view/>
    </div>
  </div>
</template>



