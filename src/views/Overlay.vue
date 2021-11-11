<script>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'

//import DemoProfileImg from '@/components/DemoProfileImg.vue'



export default {
    components: {
      Switch,
    },

    setup() {
      const enabled = ref(false)
      let liveWindow =ref(false)
      const openPortal = () => {
        liveWindow = window.open(`${window.location.origin}/liveoverlay`, "LiveOverlay", "width=600,height=400,left=200,top=200");
        
    }

      return { enabled, openPortal }
    
    }
  }
</script>

<template>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Overlay Live Editor UI
        </h1>
      </div>
    </header>
     <div id="page-body" > 
        <div id="overlay-editor">
          <div id="overlay-view" class="demo-bg-img">
            <div id="h-bar" class="p-2 flex flex-row items-center justify-items-stretch h-16">
              <h3 class="text-yellow-700 font-bold text-xl flex-grow">Top</h3>
              <div class="place-self-end flex flex-row">
                <v-icon class="bg-blue-500 rounded-full" name="gi-cape-armor" fill="#FFF933" scale="1.5" />
                <v-icon class="bg-blue-500 rounded-full" name="gi-cape-armor" fill="#FFF933" scale="1.5" />
              </div>
            </div> 
          </div>
          <div id="overlay-controls">
            <div class="control-panel justify-items-center items-center">
                <button on @click.prevent="openPortal()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded self-center">
                  Open Live Overlay
                </button>
            </div>  
            <div class="control-panel">
             <Switch
              v-model="enabled"
              :class="enabled ? 'bg-purple-900 switch' : 'bg-purple-700 switch'"
            >
              <span class="sr-only">Top Bar</span>
              <span
                :class="enabled ? 'translate-x-6 switch-trans' : 'translate-x-1 switch-trans'"
              />
            </Switch>
            <label>Horizontal Bar</label>
            <div class="active-panel">
                <div class="field-warpper">
                  <label>Position</label>
                  <select>
                    <option>Top</option>
                    <option>Bottom</option>
                  </select>
                </div>
                
            </div>
            </div>
          </div>
        </div>
      </div>

</template>
<style scoped>
  #page-body {
    @apply flex-grow flex justify-items-start w-full flex-nowrap flex-col;
  }
  #overlay-editor {
    @apply flex-grow justify-self-center self-center py-4 px-16;
    @apply flex flex-col  bg-gray-900 w-full flex-nowrap;
  };
  #overlay-view {
    @apply rounded-t-xl rounded-b-none;
    @apply w-full h-full flex;
  };
  #overlay-controls {
    @apply rounded-t-none rounded-b-xl;
    @apply p-6 bg-gray-300;
    @apply flex-col justify-evenly;
  };
  #h-bar {
    @apply bg-gradient-to-r from-green-400 to-blue-500 w-full z-10;
    @apply  p-2 flex flex-row items-center justify-items-stretch h-16;
  }
  #v-bar {
    @apply absolute  w-full;
    @apply bg-gradient-to-r from-green-400 to-blue-500;
    @apply  p-2 flex flex-row items-center justify-items-stretch h-16;
  }
  .control-panel {
    @apply flex flex-row w-full;
  }
  .active-panel {
    @apply flex flex-row flex-grow;
  }
  .inactive-panel {
    @apply hidden;
  }
  .switch {
    @apply relative inline-flex items-center h-6 rounded-full w-11;
  };
  .switch-trans {
    @apply inline-block w-4 h-4 transition-transform transform bg-white rounded-full;
  };
  .demo-bg-img {
    background-image: url('../assets/ppp-profile.png');
    background-size: cover;
    background-repeat: no-repeat;
    
  };
  
</style>