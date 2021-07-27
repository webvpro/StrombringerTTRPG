<script>
import { onBeforeMount } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import firebase from 'firebase';
import PageHeader from '@/components/PageHeader.vue';


export default {
  components: {
    PageHeader
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    
    onBeforeMount(()=>{
      firebase.auth().onAuthStateChanged((user) => {
        if (!user && route.meta.secure) {
          router.push('/');
        }


      });
    })

  }
}
</script>
<template>
  <div class="h-full w-full flex flex-col flex-nowrap flex-grow">
    <header class="bg-indigo-900 shadow" v-if="$route.meta.title">
      <PageHeader />
    </header>
    <div class="flex-grow flex flex-col">
      <router-view/>
    </div>
  </div>
</template>



