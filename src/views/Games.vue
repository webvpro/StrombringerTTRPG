<template>
    <div class="bg-gray-50">
      <div
        class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
      >
        <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
        >
          Games
          <br />
          <span class="text-indigo-600">See some games</span>
        </h2>
        <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
          <div class="inline-flex rounded-md shadow">
            <router-link to="/" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none">
                Back Home
            </router-link>
          </div>
        </div>
      </div>      
    </div>
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
        <h3 class="max-w-screen-xl text-lg leading-6 font-medium text-gray-900">
            Games ({{collectionData.length}})
        </h3>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div v-for="item in games" :key="item.id" class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt class="text-sm font-medium text-gray-500 truncate">
                {{ item.name }}
                </dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">
                Thing
                </dd>
            </div>
        </dl>
  </div>
</template>
<script>
import { toRefs, reactive, onMounted,  } from 'vue'
import { useAuthState, db } from '@/modules/firebase'
import useGameCollection from '@/modules/use-collection'

export default {
  setup() {
    const state = reactive({
        games:[],
        loading: false
    });  
    const { user } = useAuthState()
    const  { getCollection, collectionData, error } = useGameCollection('games',{
      onMouted: true,
      //where: ['name','==', '555']
      orderBy: ['name', 'asc']
    })
   state.games = collectionData;
    onMounted(() => {
      getCollection();
    })
    
    return {
      user,
      collectionData,
      error,
      getCollection,
      ...toRefs(state),
    }
  },
}
</script>