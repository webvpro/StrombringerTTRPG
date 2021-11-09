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
    <div class="max-w-screen-xl px-4 py-12 mx-36 sm:px-6 lg:py-16 lg:px-8">
      <h3 class="max-w-screen-2xl text-lg leading-6 font-medium text-gray-900">
          Games ({{collectionData.length}})
          <button @click.prevent="showForm()" type="button" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
        </button>
      </h3>
      <dl class="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <div v-for="item in games" :key="item.id" class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <div class="w-full flex items-center justify-between p-6 space-x-6">
              <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                  <h3 class="text-gray-900 text-sm font-medium truncate">{{ item.name }}</h3>
                  <span class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{ item.id }}</span>
                </div>
                <p class="mt-1 text-gray-500 text-sm truncate">{{ item.description }}</p>
              </div>
              <img class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" :src="game.imageUrl" alt="" />
            </div>
            <div>
              <div class="-mt-px flex divide-x divide-gray-200">
                <div class="w-0 flex-1 flex">
                  <a href="#" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <PlayIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span class="ml-3">Play</span>
                  </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                  <a href="#" @click.prevent="showForm(item.id)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <CogIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span class="ml-3">Update</span>
                  </a>
                </div>
                <div class="-ml-px w-0 flex-1 flex">
                  <a href="#" @click.prevent="showForm(item.id)" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                    <ClipboardCopyIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span class="ml-3">Invite</span>
                  </a>
                </div>
              </div>
            </div>
        </div>
      </dl>
  </div>
  <GamePanelForm v-if="openForm" />
</template>
<script>
import { toRefs, reactive, onMounted, provide, computed } from 'vue'
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/vue/outline'
import { PlayIcon, CogIcon, ClipboardCopyIcon } from '@heroicons/vue/solid'
import { useAuthState } from '@/modules/firebase'
import useGameCollection from '@/modules/use-collection'
import useGameDoc from '@/modules/use-doc'
import GamePanelForm from '@/components/slideoutforms/GameForm.vue'

export default {
  components: {
    GamePanelForm,
    PlusSmIconOutline,
    PlayIcon,
    CogIcon,
    ClipboardCopyIcon
  },

  setup() {
    const state = reactive({
        games:[],
        loading: false,
        openForm: false,
        game: {},
    });  
    const { user } = useAuthState()
    const  { getCollection, collectionData, error } = useGameCollection('games',{
      onMouted: true,
      //where: ['name','==', '555']
      orderBy: ['name', 'asc']
    })
    const { setDocument, deleteDocument } = useGameDoc('games')
    state.games = collectionData;
    

    const showForm = (id=null) => {
      state.openForm = true
      if (id) {
        state.game = { ...state.games.find(x => x.id === id)};
      } else {
        state.game = {}
      }  
    }
    const hideForm = () => {
      state.openForm = false
      state.game = {}
    }
    const saveDocument = form => {
      state.loading = true
      console.log(form)
      try {
          setDocument(form)
          hideForm()
      } catch (error) {
        state.error = error;
      }
      state.loading = false
    }
    
    const deleteDoc = id => {
      state.loading = true
      
      try {
          deleteDocument(id)
          hideForm()
      } catch (error) {
        state.error = error;
      }
      state.loading = false
    }
        
    provide('openForm', computed(() => state.openForm))
    provide('game', computed(() => state.game))
    provide('hideForm', hideForm)
    provide('saveDocument', saveDocument)
    provide('deleteDoc', deleteDoc)
    onMounted(() => {
      getCollection();
    })
    
    return {
      user,
      collectionData,
      error,
      getCollection,
      ...toRefs(state),
      showForm,
      hideForm,
      setDocument

    }
  },
}
</script>