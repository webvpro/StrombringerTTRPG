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
    <div class="mx-16 lg:mx-36">
      <h3 class="max-w-screen-2xl text-lg leading-6 font-medium text-gray-900">
          Games ({{collectionData.length}})
          <button @click.prevent="showForm()" type="button" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
        </button>
      </h3>
      <ul role="list" class="mt-3 grid grid-cols-1 gap-2 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="item in games" :key="item.id" class="col-span-1 flex shadow-sm rounded-md">
            <div class="bg-indigo-900 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
               <v-icon name="gi-winged-sword" :scale="3" alt="" class="text-yellow-500" />
            </div>
            <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div class="flex-1 px-4 py-2 text-sm truncate">
                <a href="#" class="text-gray-900 font-medium hover:text-gray-600">{{ item.name }}</a>
                <p class="text-gray-500">{{item.description}}</p>
              </div>
              <div class="flex-grow-1 pr-2">
                <button @click="showForm(item.id)" type="button" class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="sr-only">Open options</span>
                  <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        </ul>
  </div>
  <GamePanelForm v-if="openForm" />
</template>
<script>
import { toRefs, reactive, onMounted, provide, computed } from 'vue'
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/vue/outline'
import { PlayIcon, CogIcon, ClipboardCopyIcon, DotsVerticalIcon } from '@heroicons/vue/solid'
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
    ClipboardCopyIcon,
    DotsVerticalIcon
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